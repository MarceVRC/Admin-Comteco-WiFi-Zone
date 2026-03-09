import React from "react";
import { Paper, Typography, Box } from "@mui/material";
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
} from "recharts";

const getColor = (total) => {
    if (total === 0) return "#e0e0e0";
    if (total >= 3) return "#b71c1c";
    return "#ef9a9a";
};

export default function GraficoActividad({ datos }) {
    // Only show hours with non-zero values + a small buffer around them, or all 24
    return (
        <Paper elevation={3} sx={{ p: 3, borderRadius: 3, backgroundColor: "white", boxShadow: "0 2px 12px rgba(0,0,0,0.08)" }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: "#333" }}>
                Actividad por Hora del Día
            </Typography>
            <Box sx={{ height: 280 }}>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={datos} margin={{ top: 10, right: 20, bottom: 50, left: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="hora" tick={{ fontSize: 10, angle: -45, textAnchor: "end" }} interval={1} height={70} />
                        <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
                        <Tooltip formatter={(v) => [`${v} reportes`, "Total"]} />
                        <Bar dataKey="total" radius={[4, 4, 0, 0]}>
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
