import React from "react";
import { Paper, Typography, Box } from "@mui/material";
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, LabelList,
} from "recharts";

const COLORS = ["#b71c1c", "#d32f2f", "#e53935", "#ef5350", "#e57373", "#ffcdd2"];

export default function GraficoReportesPorZona({ datos }) {
    const height = Math.max(220, datos.length * 44);
    return (
        <Paper elevation={3} sx={{ p: 3, borderRadius: 3, backgroundColor: "white", boxShadow: "0 2px 12px rgba(0,0,0,0.08)" }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: "#333" }}>
                Reportes por Zona
            </Typography>
            <Box sx={{ height }}>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        layout="vertical"
                        data={datos}
                        margin={{ top: 0, right: 40, bottom: 0, left: 0 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                        <XAxis type="number" allowDecimals={false} tick={{ fontSize: 12 }} />
                        <YAxis type="category" dataKey="zona" width={140} tick={{ fontSize: 12 }} />
                        <Tooltip formatter={(v) => [`${v} reportes`, "Total"]} />
                        <Bar dataKey="total" radius={[0, 6, 6, 0]}>
                            {datos.map((_, i) => (
                                <Cell key={i} fill={COLORS[i % COLORS.length]} />
                            ))}
                            <LabelList dataKey="total" position="right" style={{ fontSize: 12, fontWeight: 700 }} />
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </Box>
        </Paper>
    );
}
