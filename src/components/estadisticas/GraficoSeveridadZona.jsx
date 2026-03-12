import React from "react";
import { Paper, Typography, Box } from "@mui/material";
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from "recharts";

const SEV_COLORS = {
    Leve: "#2e7d32",
    Moderado: "#e65100",
    "Crítico": "#CC0000",
};

export default function GraficoSeveridadZona({ datos }) {
    return (
        <Paper elevation={0} sx={{ p: 4, backgroundColor: "white", borderRadius: 4, border: "1px solid rgba(0,0,0,0.06)", height: "100%" }}>
            <Box sx={{ mb: 4 }}>
                <Typography variant="h6" sx={{ fontWeight: 800, color: "#1a1a1a" }}>
                    Desglose de Criticidad por Nodo
                </Typography>
                <Typography variant="caption" color="text.secondary">
                    Distribución de niveles de reporte por ubicación
                </Typography>
            </Box>

            <Box sx={{ height: 350 }}>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={datos} margin={{ top: 10, right: 30, bottom: 80, left: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                        <XAxis 
                            dataKey="zona" 
                            axisLine={false} 
                            tickLine={false} 
                            tick={{ fontSize: 9, fontWeight: 800, angle: -60, textAnchor: "end" }} 
                            height={100} 
                            interval={0}
                        />
                        <YAxis 
                            allowDecimals={false} 
                            axisLine={false} 
                            tickLine={false} 
                            tick={{ fontSize: 13, fill: "#888" }}
                        />
                        <Tooltip 
                            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 8px 24px rgba(0,0,0,0.1)' }}
                        />
                        <Legend verticalAlign="top" align="right" iconType="circle" wrapperStyle={{ paddingBottom: '30px' }} />
                        {["Leve", "Moderado", "Crítico"].map((key) => (
                            <Bar 
                                key={key} 
                                dataKey={key} 
                                stackId="sev" 
                                fill={SEV_COLORS[key]} 
                                radius={key === "Crítico" ? [4, 4, 0, 0] : [0, 0, 0, 0]} 
                                barSize={40}
                            />
                        ))}
                    </BarChart>
                </ResponsiveContainer>
            </Box>
        </Paper>
    );
}
