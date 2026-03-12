import React from "react";
import { Paper, Typography, Box } from "@mui/material";
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
} from "recharts";

const getColor = (total) => {
    if (total === 0) return "#f5f5f5";
    if (total >= 10) return "#CC0000";
    if (total >= 5) return "#ef5350";
    return "#ffcdd2";
};

export default function GraficoActividad({ datos }) {
    return (
        <Paper elevation={0} sx={{ p: 4, backgroundColor: "white", borderRadius: 4, border: "1px solid rgba(0,0,0,0.06)", height: "100%" }}>
            <Box sx={{ mb: 4 }}>
                <Typography variant="h6" sx={{ fontWeight: 800, color: "#1a1a1a" }}>
                    Carga Horaria
                </Typography>
                <Typography variant="caption" color="text.secondary">
                    Distribución de reportes según la hora del día
                </Typography>
            </Box>

            <Box sx={{ height: 400 }}>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={datos} margin={{ top: 10, right: 30, bottom: 20, left: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                        <XAxis 
                            dataKey="hora" 
                            axisLine={false} 
                            tickLine={false} 
                            tick={{ fontSize: 10, fill: "#888", fontWeight: 700 }} 
                            interval={5} // Mostrar cada 6 horas (00, 06, 12, 18) para seguridad total
                        />
                        <YAxis 
                            allowDecimals={false} 
                            axisLine={false} 
                            tickLine={false} 
                            tick={{ fontSize: 12, fill: "#999" }}
                        />
                        <Tooltip 
                            cursor={{ fill: 'rgba(0,0,0,0.02)' }}
                            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 8px 24px rgba(0,0,0,0.1)' }}
                            formatter={(v) => [`${v} reportes`, "Total"]} 
                        />
                        <Bar dataKey="total" radius={[8, 8, 0, 0]} barSize={25}>
                            {datos.map((entry, i) => (
                                <Cell key={i} fill={getColor(entry.total)} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </Box>
        </Paper>
    );
}
