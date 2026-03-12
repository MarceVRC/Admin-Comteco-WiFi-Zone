import React from "react";
import { Paper, Typography, Box } from "@mui/material";
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Cell,
} from "recharts";

const getColor = (promedio) => {
    if (promedio >= 4.5) return "#b71c1c";
    if (promedio >= 3) return "#e65100";
    return "#388e3c";
};

export default function GraficoGravedadZona({ datos }) {
    return (
        <Paper elevation={3} sx={{ p: 3, borderRadius: 0, backgroundColor: "white", boxShadow: "0 2px 12px rgba(0,0,0,0.08)" }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: "#333" }}>
                Gravedad Promedio por Zona
            </Typography>
            <Box sx={{ height: 280 }}>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={datos} margin={{ top: 10, right: 20, bottom: 50, left: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="zona" tick={{ fontSize: 11, angle: -30, textAnchor: "end" }} interval={0} height={70} />
                        <YAxis domain={[0, 5]} ticks={[1, 2, 3, 4, 5]} tick={{ fontSize: 12 }} />
                        <Tooltip formatter={(v) => [`${v} / 5`, "Gravedad promedio"]} />
                        <ReferenceLine y={3} stroke="#f57c00" strokeDasharray="4 4" label={{ value: "Umbral", fontSize: 11, fill: "#f57c00" }} />
                        <Bar dataKey="promedio" radius={[6, 6, 0, 0]}>
                            {datos.map((entry, i) => (
                                <Cell key={i} fill={getColor(entry.promedio)} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </Box>
        </Paper>
    );
}
