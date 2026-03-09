import React from "react";
import { Paper, Typography, Box } from "@mui/material";
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from "recharts";

const SEV_COLORS = {
    Leve: "#388e3c",
    Moderado: "#e65100",
    "Crítico": "#b71c1c",
};

export default function GraficoSeveridadZona({ datos }) {
    return (
        <Paper elevation={3} sx={{ p: 3, borderRadius: 3, backgroundColor: "white", boxShadow: "0 2px 12px rgba(0,0,0,0.08)" }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: "#333" }}>
                Severidad Acumulada por Zona
            </Typography>
            <Box sx={{ height: 280 }}>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={datos} margin={{ top: 10, right: 20, bottom: 50, left: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="zona" tick={{ fontSize: 11, angle: -30, textAnchor: "end" }} interval={0} height={70} />
                        <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
                        <Tooltip />
                        <Legend verticalAlign="top" />
                        {["Leve", "Moderado", "Crítico"].map((key) => (
                            <Bar key={key} dataKey={key} stackId="sev" fill={SEV_COLORS[key]} radius={key === "Crítico" ? [6, 6, 0, 0] : [0, 0, 0, 0]} />
                        ))}
                    </BarChart>
                </ResponsiveContainer>
            </Box>
        </Paper>
    );
}
