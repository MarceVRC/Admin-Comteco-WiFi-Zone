import React, { useState, useEffect, useMemo } from "react";
import { Box, Paper, Typography, CircularProgress, Alert, Container } from "@mui/material";
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

        const mapaZonas = {};
        listaZonas.forEach(z => {
          mapaZonas[z.id] = z.nombre;
        });

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
        setError("Error al cargar los reportes.");
      } finally {
        setCargando(false);
      }
    };
    cargarDatos();
  }, []);

  const opcionesMeses = useMemo(() => {
    const mesesSet = new Set();
    reportes.forEach(rep => {
      const mesNum = rep.fechaObj.getMonth() + 1;
      const anioNum = rep.fechaObj.getFullYear();
      mesesSet.add(`${String(mesNum).padStart(2, '0')}-${anioNum}`);
    });
    return Array.from(mesesSet).sort((a, b) => {
      const [mA, yA] = a.split('-').map(Number);
      const [mB, yB] = b.split('-').map(Number);
      return yB !== yA ? yB - yA : mB - mA;
    });
  }, [reportes]);

  const reportesFiltrados = reportes.filter(rep => {
    const porZona = zona === "todas" || String(rep.zona_id) === String(zona);
    let porMes = true;
    if (mes !== "todos") {
      const [m, y] = mes.split("-").map(Number);
      const mesReporte = rep.fechaObj.getMonth() + 1;
      const anioReporte = rep.fechaObj.getFullYear();
      porMes = mesReporte === m && anioReporte === y;
    }
    return porZona && porMes;
  });

  return (
    <Layout>
      <Container maxWidth="xl" sx={{ mt: { xs: 1, md: 3 }, px: { xs: 1, sm: 2 } }}>
        <Paper
          elevation={3}
          sx={{
            p: { xs: 2, sm: 3, md: 4 },
            borderRadius: 3,
            overflow: 'hidden'
          }}
        >
          <Typography
            variant="h5"
            sx={{
              mb: 3,
              fontWeight: "bold",
              color: "#CC0000",
            }}
          >
            Reportes de Usuarios
          </Typography>

          <FiltrosReportes
            mes={mes}
            setMes={setMes}
            zona={zona}
            setZona={setZona}
            zonas={zonas}
            opcionesMeses={opcionesMeses}
          />

          {cargando ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
              <CircularProgress color="primary" />
            </Box>
          ) : error ? (
            <Alert severity="error">{error}</Alert>
          ) : (
            <TablaReportes reportes={reportesFiltrados} />
          )}
        </Paper>
      </Container>
    </Layout>
  );
}
