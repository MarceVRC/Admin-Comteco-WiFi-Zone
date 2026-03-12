import React from "react";
import { Paper, Typography, Box } from "@mui/material";
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Cell,
} from "recharts";

const getColor = (promedio) => {
    if (promedio >= 4.0) return "#b71c1c";
    if (promedio >= 2.5) return "#e65100";
    return "#2e7d32";
};

export default function GraficoGravedadZona({ datos }) {
    return (
        <Paper elevation={0} sx={{ p: 4, backgroundColor: "white", borderRadius: 4, border: "1px solid rgba(0,0,0,0.06)", height: "100%" }}>
            <Box sx={{ mb: 4 }}>
                <Typography variant="h6" sx={{ fontWeight: 800, color: "#1a1a1a" }}>
                    Salud de Conexión por Nodo
                </Typography>
                <Typography variant="caption" color="text.secondary">
                    Índice de severidad (Calidad de Servicio)
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
                            domain={[0, 5]} 
                            ticks={[1, 2, 3, 4, 5]} 
                            axisLine={false} 
                            tickLine={false} 
                            tick={{ fontSize: 13, fill: "#888" }}
                        />
                        <Tooltip 
                            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 8px 24px rgba(0,0,0,0.1)' }}
                            formatter={(v) => [`${v} / 5`, "Grado de Gravedad"]} 
                        />
                        <ReferenceLine y={3} stroke="#f57c00" strokeDasharray="6 6" label={{ value: "Nivel de Alerta", position: 'right', fill: '#f57c00', fontSize: 10, fontWeight: 700 }} />
                        <Bar dataKey="promedio" radius={[6, 6, 0, 0]} barSize={40}>
                            {datos?.map((entry, i) => (
                                <Cell key={i} fill={getColor(entry.promedio)} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </Box>
        </Paper>
    );
}
