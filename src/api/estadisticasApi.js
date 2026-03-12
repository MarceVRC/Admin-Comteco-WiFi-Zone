import { env } from "../config/env";
import { apiFetch } from "./apiClient";

/**
 * Obtiene y procesa todos los datos necesarios para el dashboard de estadísticas.
 */
export const obtenerDatosEstadisticas = async () => {
    const [resReportes, resZonas] = await Promise.all([
        apiFetch(env.REPORTS_API_URL),
        apiFetch(env.API_BASE_URL),
    ]);

    if (!resReportes.ok || !resZonas.ok) {
        throw new Error("Error al obtener datos del servidor.");
    }

    const { reportes } = await resReportes.json();
    const { zonas } = await resZonas.json();

    // Mapa id -> nombre de zona
    const mapaZonas = {};
    zonas.forEach(z => { mapaZonas[z.id] = z.nombre || z.id; });

    // ── 1. Reportes por zona ──────────────────
    const conteoZona = {};
    reportes.forEach(r => {
        const nombre = mapaZonas[r.zona_id] || r.zona_id;
        conteoZona[nombre] = (conteoZona[nombre] || 0) + 1;
    });
    const reportesPorZona = Object.entries(conteoZona)
        .map(([zona, total]) => ({ zona, total }))
        .sort((a, b) => b.total - a.total);

    // ── 2. Tendencia por día ──────────────────
    const conteoDia = {};
    reportes.forEach(r => {
        const dia = r.fecha ? r.fecha.split("T")[0] : "Sin fecha";
        conteoDia[dia] = (conteoDia[dia] || 0) + 1;
    });
    const tendenciaDiaria = Object.entries(conteoDia)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([dia, total]) => ({
            dia: new Date(dia + "T00:00:00").toLocaleDateString("es-ES", { day: "2-digit", month: "2-digit" }),
            total,
        }));

    // ── 3. Distribución por tipo ──────────────
    const TIPO_LABEL = {
        BAJA_COBERTURA: "Baja Cobertura",
        SIN_CONEXION: "Sin Conexión",
        LENTITUD: "Lentitud",
        OTROS: "Otros",
    };
    const conteoTipo = {};
    reportes.forEach(r => {
        const label = TIPO_LABEL[r.tipo] || r.tipo;
        conteoTipo[label] = (conteoTipo[label] || 0) + 1;
    });
    const distribucionTipo = Object.entries(conteoTipo).map(([name, value]) => ({ name, value }));

    // ── 4. Gravedad promedio por zona ─────────
    const gravZona = {};
    reportes.forEach(r => {
        const nombre = mapaZonas[r.zona_id] || r.zona_id;
        if (!gravZona[nombre]) gravZona[nombre] = { suma: 0, count: 0 };
        gravZona[nombre].suma += r.gravedad;
        gravZona[nombre].count += 1;
    });
    const gravedadPorZona = Object.entries(gravZona)
        .map(([zona, { suma, count }]) => ({ zona, promedio: +(suma / count).toFixed(2) }))
        .sort((a, b) => b.promedio - a.promedio);

    // ── 5. Actividad por hora ─────────────────
    const conteoHora = {};
    reportes.forEach(r => {
        if (r.hora) {
            const hora = parseInt(r.hora.split(":")[0], 10);
            conteoHora[hora] = (conteoHora[hora] || 0) + 1;
        }
    });
    const actividadPorHora = Array.from({ length: 24 }, (_, h) => ({
        hora: `${String(h).padStart(2, "0")}:00`,
        total: conteoHora[h] || 0,
    }));

    // ── 6. Severidad acumulada por zona ───────
    const sevZona = {};
    reportes.forEach(r => {
        const nombre = mapaZonas[r.zona_id] || r.zona_id;
        if (!sevZona[nombre]) sevZona[nombre] = { zona: nombre, Leve: 0, Moderado: 0, "Crítico": 0 };
        if (r.gravedad >= 5) sevZona[nombre]["Crítico"] += 1;
        else if (r.gravedad >= 3) sevZona[nombre].Moderado += 1;
        else sevZona[nombre].Leve += 1;
    });
    const severidadPorZona = Object.values(sevZona);

    // ── KPIs ──────────────────────────────────
    const totalReportes = reportes.length;
    const zonaMasReportada = reportesPorZona[0]?.zona || "—";
    const gravedadPromedio = reportes.length
        ? (reportes.reduce((s, r) => s + r.gravedad, 0) / reportes.length).toFixed(1)
        : "0";
    const zonasConReportes = new Set(reportes.map(r => r.zona_id)).size;
    const zonasSinIncidentes = zonas.length - zonasConReportes;

    return {
        kpis: { totalReportes, zonaMasReportada, gravedadPromedio, zonasSinIncidentes, totalZonas: zonas.length },
        reportesPorZona,
        tendenciaDiaria,
        distribucionTipo,
        gravedadPorZona,
        actividadPorHora,
        severidadPorZona,
    };
};
