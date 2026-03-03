import React, { useState } from "react";
import { Box, Paper, Typography, LinearProgress, Grid } from "@mui/material";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import Layout from "../components/Layout";

const stats = {
  reportesMes: 48,
  maxPermisible: 100,
  calidadServicio: "Moderado",
  rendimientoMes: 41.52,
  rendimientoTexto: "MALO",
  tabla: [
    { dia: "01/02/26", reportes: 5 },
    { dia: "02/02/26", reportes: 8 },
    { dia: "03/02/26", reportes: 6 },
    { dia: "04/02/26", reportes: 10 },
    { dia: "05/02/26", reportes: 4 },
    { dia: "06/02/26", reportes: 3 },
    { dia: "07/02/26", reportes: 12 },
  ],
};

const colorCalidad = (calidad) => {
  switch (calidad.toLowerCase()) {
    case "bueno":
      return "green";
    case "moderado":
      return "orange";
    case "malo":
      return "red";
    case "pesimo":
      return "#b71c1c";
    default:
      return "gray";
  }
};

export default function Estadisticas() {
  const [data, setData] = useState(stats);

  return (
    <Layout>
      {/* contenedor interior con blanco para contrastar */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        {/* CONTENEDORES SUPERIORES */}
        <Grid container spacing={2}>
        {/* Reportes del mes */}
        <Grid item xs={12} sm={4}>
          <Paper elevation={3} sx={{ padding: 2, borderRadius: 3, backgroundColor: "white", boxShadow: "0 2px 10px rgba(0,0,0,0.1)" }}>
            <Typography variant="subtitle1" sx={{ fontWeight: "bold", marginBottom: 1 }}>
              Reportes del Mes
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: "bold", marginBottom: 2 }}>
              {data.reportesMes}
            </Typography>
            <LinearProgress variant="determinate" value={(data.reportesMes / data.maxPermisible) * 100} sx={{ height: 10, borderRadius: 5, marginBottom: 1 }} />
            <Typography variant="caption" color="text.secondary">
              Máximo permisible {data.maxPermisible}
            </Typography>
          </Paper>
        </Grid>

        {/* Calidad del Servicio */}
        <Grid item xs={12} sm={4}>
          <Paper elevation={3} sx={{ padding: 2, borderRadius: 3, backgroundColor: "white", boxShadow: "0 2px 10px rgba(0,0,0,0.1)" }}>
            <Typography variant="subtitle1" sx={{ fontWeight: "bold", marginBottom: 2 }}>
              Calidad del Servicio
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: "bold", color: colorCalidad(data.calidadServicio) }}>
              {data.calidadServicio}
            </Typography>
          </Paper>
        </Grid>

        {/* Rendimiento vs mes anterior */}
        <Grid item xs={12} sm={4}>
          <Paper elevation={3} sx={{ padding: 2, borderRadius: 3, backgroundColor: "white", boxShadow: "0 2px 10px rgba(0,0,0,0.1)" }}>
            <Typography variant="subtitle1" sx={{ fontWeight: "bold", marginBottom: 1 }}>
              Mes actual
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: "bold" }}>
              Rendimiento vs mes anterior:
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: "bold", color: data.rendimientoTexto === "MALO" ? "red" : "green" }}>
              {data.rendimientoMes > 0 ? `+ ${data.rendimientoMes}%` : `${data.rendimientoMes}%`} {data.rendimientoTexto}
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* GRÁFICO DE LÍNEAS */}
      <Paper
        elevation={3}
        sx={{ padding: 2, borderRadius: 3, backgroundColor: "white", boxShadow: "0 2px 10px rgba(0,0,0,0.1)", height: 400 }}
      >
        <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: 2 }}>
          Reportes diarios
        </Typography>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data.tabla} margin={{ top: 10, right: 20, bottom: 20, left: 0 }}>
            <CartesianGrid stroke="#f5f5f5" />
            <XAxis dataKey="dia" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="reportes" stroke="#b71c1c" strokeWidth={3} dot={{ r: 5 }} />
          </LineChart>
        </ResponsiveContainer>
      </Paper>
    </Box>
    </Layout>
  );
}