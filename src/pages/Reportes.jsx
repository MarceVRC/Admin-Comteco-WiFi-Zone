import React, { useState } from "react";
import { Box, Paper, Typography } from "@mui/material";
import FiltrosReportes from "../components/reportes/FiltrosReportes";
import TablaReportes from "../components/reportes/TablaReportes";
import Layout from "../components/common/Layout";

export default function Reportes() {
  const [mes, setMes] = useState("02-2026");
  const [zona, setZona] = useState("todas");

  const reportes = [
    { fecha: "08/02/26", hora: "17:32", id: "R-454", zona: "Plaza 14 de Sep.", titulo: "Saturación de señal" },
    { fecha: "06/02/26", hora: "13:45", id: "R-453", zona: "Plaza 14 de Sep.", titulo: "No hay señal" },
    { fecha: "05/02/26", hora: "12:02", id: "R-452", zona: "Parque Pulpo", titulo: "Permanece en conexión" },
    { fecha: "05/02/26", hora: "19:10", id: "R-451", zona: "Plazuela del Est.", titulo: "Solo me deja acceder" },
    { fecha: "05/02/26", hora: "15:54", id: "R-450", zona: "Parque Lincoln", titulo: "No hay señal" },
  ];

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

        <FiltrosReportes mes={mes} setMes={setMes} zona={zona} setZona={setZona} />
        <TablaReportes reportes={reportes} />
      </Paper>
    </Layout>
  );
}