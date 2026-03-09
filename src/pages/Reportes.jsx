import React, { useState, useEffect } from "react";
import { Box, Paper, Typography, CircularProgress, Alert } from "@mui/material";
import FiltrosReportes from "../components/reportes/FiltrosReportes";
import TablaReportes from "../components/reportes/TablaReportes";
import Layout from "../components/common/Layout";
import { obtenerReportes } from "../api/reportesApi";
import { obtenerZonas } from "../api/zonasApi";

export default function Reportes() {
  const [mes, setMes] = useState("todos");
  const [zona, setZona] = useState("todas");
  const [reportes, setReportes] = useState([]);
  const [zonas, setZonas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        setCargando(true);
        const [listaReportes, listaZonas] = await Promise.all([
          obtenerReportes(),
          obtenerZonas()
        ]);

        setZonas(listaZonas);

        // Crear un mapa de IDs de zona a nombres
        const mapaZonas = {};
        listaZonas.forEach(z => {
          mapaZonas[z.id] = z.nombre;
        });

        // Formatear los reportes para la tabla
        const reportesFormateados = listaReportes.map(rep => {
          const fechaObj = new Date(rep.fecha);
          return {
            ...rep,
            fechaObj,
            fecha: fechaObj.toLocaleDateString('es-ES'),
            zona: mapaZonas[rep.zona_id] || rep.zona_id,
            idDisplay: `R-${String(rep.id).padStart(3, '0')}`
          };
        });

        setReportes(reportesFormateados);
      } catch (err) {
        console.error("Error al cargar reportes:", err);
        setError("No se pudieron cargar los reportes. Por favor, intenta de nuevo más tarde.");
      } finally {
        setCargando(false);
      }
    };

    cargarDatos();
  }, []);

  // Filtrar reportes
  const reportesFiltrados = reportes.filter(rep => {
    // Filtro por zona
    const porZona = zona === "todas" || rep.zona_id === zona;

    // Filtro por mes (formato MM-YYYY)
    let porMes = true;
    if (mes !== "todos") {
      const [m, y] = mes.split("-").map(Number);
      const mesReporte = rep.fechaObj.getMonth() + 1; // getMonth() es 0-indexed
      const anioReporte = rep.fechaObj.getFullYear();
      porMes = mesReporte === m && anioReporte === y;
    }

    return porZona && porMes;
  });

  return (
    <Layout>
      <Paper
        elevation={3}
        sx={{
          width: "100%",
          maxWidth: 1200,
          mx: "auto",
          p: { xs: 2, sm: 3, md: 4 },
          borderRadius: 3,
          backgroundColor: "white",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            mb: 2,
            fontWeight: "bold",
            color: "#b71c1c",
          }}
        >
          Últimos reportes
        </Typography>

        <FiltrosReportes
          mes={mes}
          setMes={setMes}
          zona={zona}
          setZona={setZona}
          zonas={zonas}
        />

        {cargando ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>
        ) : (
          <TablaReportes reportes={reportesFiltrados} />
        )}
      </Paper>
    </Layout>
  );
}