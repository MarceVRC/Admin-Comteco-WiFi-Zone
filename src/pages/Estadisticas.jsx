import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  CircularProgress,
  Alert,
  Divider,
} from "@mui/material";

// Iconos Ejecutivos
import AssessmentIcon from "@mui/icons-material/Assessment";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SpeedIcon from '@mui/icons-material/Speed';
import WifiTetheringIcon from '@mui/icons-material/WifiTethering';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

// Componentes
import TarjetaKPI from "../components/estadisticas/TarjetaKPI";
import GraficoTendencia from "../components/estadisticas/GraficoTendencia";
import GraficoReportesPorZona from "../components/estadisticas/GraficoReportesPorZona";
import GraficoTipo from "../components/estadisticas/GraficoTipo";
import GraficoGravedadZona from "../components/estadisticas/GraficoGravedadZona";
import GraficoActividad from "../components/estadisticas/GraficoActividad";
import GraficoSeveridadZona from "../components/estadisticas/GraficoSeveridadZona";

import { obtenerDatosEstadisticas } from "../api/estadisticasApi";
import Layout from "../components/common/Layout";

export default function Estadisticas() {
  const [datos, setDatos] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cargarData = async () => {
      try {
        setCargando(true);
        const res = await obtenerDatosEstadisticas();
        setDatos(res);
      } catch (err) {
        console.error("Error cargando estadísticas:", err);
        setError("Error de comunicación con el servicio de analíticas.");
      } finally {
        setCargando(false);
      }
    };
    cargarData();
  }, []);

  if (cargando) return (
    <Layout>
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}>
        <CircularProgress size={50} sx={{ color: "#CC0000" }} thickness={5} />
      </Box>
    </Layout>
  );

  if (error) return (
    <Layout>
      <Box sx={{ p: 4 }}><Alert severity="error" variant="filled" sx={{ borderRadius: 3 }}>{error}</Alert></Box>
    </Layout>
  );

  if (!datos) return null;

  const { kpis } = datos;
  const disponibilidadVal = ((kpis.zonasSinIncidentes / kpis.totalZonas) * 100).toFixed(1);

  return (
    <Layout>
      <Box sx={{ py: 2, width: '100%' }}>
        
        {/* CABECERA EJECUTIVA */}
        <Box sx={{ mb: 5, px: { xs: 1, md: 2 } }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
            <TrendingUpIcon sx={{ color: '#CC0000', fontSize: 32 }} />
            <Typography variant="h4" sx={{ fontWeight: 900, color: "#1a1a1a", letterSpacing: "-1px" }}>
                Panel de Analítica de Infraestructura
            </Typography>
          </Box>
          <Typography variant="body1" sx={{ color: "text.secondary", fontWeight: 500, maxWidth: 800 }}>
            Supervisión técnica avanzada de los nodos WiFi COMTECO. Métricas de rendimiento y calidad de servicio.
          </Typography>
        </Box>

        {/* MÉTRICAS CLAVE (KPIs) */}
        <Grid container spacing={4} sx={{ mb: 6 }} alignItems="stretch" justifyContent="center">
          <Grid item xs={12} sm={6} lg={3}>
            <TarjetaKPI 
                titulo="Incidencias Totales" 
                valor={kpis.totalReportes} 
                subtitulo="Reportes procesados"
                icono={<AssessmentIcon />} 
                color="#CC0000" 
            />
          </Grid>
          <Grid item xs={12} sm={6} lg={3}>
            <TarjetaKPI 
                titulo="Nodo Crítico" 
                valor={kpis.zonaMasReportada} 
                subtitulo="Zona de mayor recurrencia"
                icono={<LocationOnIcon />} 
                color="#CC0000" 
            />
          </Grid>
          <Grid item xs={12} sm={6} lg={3}>
            <TarjetaKPI 
                titulo="Nivel de Gravedad" 
                valor={kpis.gravedadPromedio} 
                subtitulo="Promedio de criticidad"
                icono={<SpeedIcon />} 
                color="#e65100" 
            />
          </Grid>
          <Grid item xs={12} sm={6} lg={3}>
            <TarjetaKPI 
                titulo="Estabilidad de Red" 
                valor={`${disponibilidadVal}%`} 
                subtitulo={`${kpis.zonasSinIncidentes} de ${kpis.totalZonas} nodos operativos`}
                icono={<WifiTetheringIcon />} 
                color="#2e7d32" 
                porcentaje={parseFloat(disponibilidadVal)}
            />
          </Grid>
        </Grid>

        <Divider sx={{ mb: 2, opacity: 0.1 }} />

        {/* SECCIÓN DE GRÁFICOS - DISEÑO DE ANCHO COMPLETO PARA MÁXIMA LECTURA */}
        <Box sx={{ mb: 2, px: { xs: 1, md: 2 } }}>
            <Typography variant="h5" sx={{ fontWeight: 800, color: "#1a1a1a" }}>
                Analítica y Distribución Visual
            </Typography>
            <Typography variant="body2" color="text.secondary">
                Desglose detallado del comportamiento de la red, tendencias temporales y niveles de criticidad por nodo.
            </Typography>
        </Box>

        <Grid container spacing={5} justifyContent="center">
          
          {/* Fila 1: Tendencia Temporal (Ancho Total) */}
          <Grid item xs={12}>
            <GraficoTendencia datos={datos.tendenciaDiaria} />
          </Grid>

          {/* Fila 2: Carga Horaria (Ancho Total para evitar amontonamiento de horas) */}
          <Grid item xs={12}>
            <GraficoActividad datos={datos.actividadPorHora} />
          </Grid>

          {/* Fila 3: Distribución Geográfica (Ancho Total para nombres largos) */}
          <Grid item xs={12}>
            <GraficoReportesPorZona datos={datos.reportesPorZona} />
          </Grid>

          {/* Fila 4: Análisis de Calidad y Tipo (Triple Columna Balanceada) */}
          <Grid item xs={12} lg={4}>
            <GraficoTipo datos={datos.distribucionTipo} />
          </Grid>
          <Grid item xs={12} lg={4}>
            <GraficoGravedadZona datos={datos.gravedadPorZona} />
          </Grid>
          <Grid item xs={12} lg={4}>
            <GraficoSeveridadZona datos={datos.severidadPorZona} />
          </Grid>

        </Grid>

      </Box>
    </Layout>
  );
}
