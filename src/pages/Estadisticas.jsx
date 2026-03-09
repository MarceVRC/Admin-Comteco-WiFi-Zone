import React, { useEffect, useState } from "react";
import {
  Box, Typography, CircularProgress, Alert,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import AssessmentIcon from "@mui/icons-material/Assessment";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

import Layout from "../components/common/Layout";
import TarjetaKPI from "../components/estadisticas/TarjetaKPI";
import GraficoTendencia from "../components/estadisticas/GraficoTendencia";
import GraficoReportesPorZona from "../components/estadisticas/GraficoReportesPorZona";
import GraficoTipo from "../components/estadisticas/GraficoTipo";
import GraficoGravedadZona from "../components/estadisticas/GraficoGravedadZona";
import GraficoActividad from "../components/estadisticas/GraficoActividad";
import GraficoSeveridadZona from "../components/estadisticas/GraficoSeveridadZona";
import { obtenerDatosEstadisticas } from "../api/estadisticasApi";

export default function Estadisticas() {
  const [datos, setDatos] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    obtenerDatosEstadisticas()
      .then(setDatos)
      .catch((err) => setError(err.message))
      .finally(() => setCargando(false));
  }, []);

  if (cargando) {
    return (
      <Layout>
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "60vh" }}>
          <CircularProgress sx={{ color: "#b71c1c" }} size={56} />
        </Box>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <Alert severity="error" sx={{ m: 4 }}>{error}</Alert>
      </Layout>
    );
  }

  const {
    kpis,
    reportesPorZona,
    tendenciaDiaria,
    distribucionTipo,
    gravedadPorZona,
    actividadPorHora,
    severidadPorZona,
  } = datos;

  return (
    <Layout>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>

        <Typography variant="h5" sx={{ fontWeight: 800, color: "#b71c1c" }}>
          Estadísticas de Zonas Wi-Fi
        </Typography>

        {/* KPIs — 4 columnas */}
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <TarjetaKPI titulo="Total Reportes" valor={kpis.totalReportes} subtitulo="En total acumulado" icono={<AssessmentIcon />} color="#b71c1c" />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <TarjetaKPI titulo="Zona Más Reportada" valor={kpis.zonaMasReportada} subtitulo="Mayor número de incidentes" icono={<LocationOnIcon />} color="#d32f2f" />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <TarjetaKPI titulo="Gravedad Promedio" valor={`${kpis.gravedadPromedio} / 5`} subtitulo="Promedio de todos los reportes" icono={<WarningAmberIcon />} color="#e65100" />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <TarjetaKPI titulo="Zonas Sin Incidentes" valor={kpis.zonasSinIncidentes} subtitulo={`de ${kpis.totalZonas} zonas totales`} icono={<CheckCircleOutlineIcon />} color="#388e3c" />
          </Grid>
        </Grid>

        {/* Fila 1 */}
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 7 }}>
            <GraficoTendencia datos={tendenciaDiaria} />
          </Grid>
          <Grid size={{ xs: 12, md: 5 }}>
            <GraficoReportesPorZona datos={reportesPorZona} />
          </Grid>
        </Grid>

        {/* Fila 2 */}
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 5 }}>
            <GraficoTipo datos={distribucionTipo} />
          </Grid>
          <Grid size={{ xs: 12, md: 7 }}>
            <GraficoGravedadZona datos={gravedadPorZona} />
          </Grid>
        </Grid>

        {/* Fila 3 */}
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }}>
            <GraficoActividad datos={actividadPorHora} />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <GraficoSeveridadZona datos={severidadPorZona} />
          </Grid>
        </Grid>

      </Box>
    </Layout>
  );
}