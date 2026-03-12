import React from "react";
import { Paper, Typography, Box } from "@mui/material";
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, LabelList,
} from "recharts";

const COLORS = ["#b71c1c", "#d32f2f", "#e53935", "#ef5350", "#e57373", "#ff8a80"];

export default function GraficoReportesPorZona({ datos }) {
    // Altura dinámica: 60px por cada zona, mínimo 500px, máximo 1200px para no ser eterno
    const chartHeight = Math.min(1200, Math.max(500, (datos?.length || 0) * 60));

    return (
        <Paper elevation={0} sx={{ p: 4, backgroundColor: "white", borderRadius: 4, border: "1px solid rgba(0,0,0,0.06)", height: "100%" }}>
            <Box sx={{ mb: 4 }}>
                <Typography variant="h6" sx={{ fontWeight: 800, color: "#1a1a1a" }}>
                    Incidencias por Nodo Geográfico
                </Typography>
                <Typography variant="caption" color="text.secondary">
                    Desglose detallado del volumen de reportes por ubicación de red
                </Typography>
            </Box>

            <Box sx={{ height: chartHeight, width: '100%' }}>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        layout="vertical"
                        data={datos}
                        margin={{ top: 5, right: 100, bottom: 20, left: 10 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f5f5f5" />
                        <XAxis 
                            type="number" 
                            axisLine={false} 
                            tickLine={false} 
                            tick={{ fontSize: 13, fontWeight: 500, fill: "#888" }}
                        />
                        <YAxis 
                            type="category" 
                            dataKey="zona" 
                            width={180} // Aún más espacio para nombres largos
                            tick={{ fontSize: 13, fontWeight: 700, fill: "#222" }} 
                            axisLine={false}
                            tickLine={false}
                        />
                        <Tooltip 
                            cursor={{ fill: 'rgba(0,0,0,0.02)' }}
                            contentStyle={{ borderRadius: '15px', border: 'none', boxShadow: '0 10px 40px rgba(0,0,0,0.1)' }}
                        />
                        <Bar dataKey="total" radius={[0, 12, 12, 0]} barSize={34}>
                            {datos?.map((_, i) => (
                                <Cell key={i} fill={COLORS[i % COLORS.length]} />
                            ))}
                            <LabelList 
                                dataKey="total" 
                                position="right" 
                                style={{ fontSize: 16, fontWeight: 900, fill: "#1a1a1a" }} 
                                offset={25} 
                            />
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </Box>
        </Paper>
    );
}
