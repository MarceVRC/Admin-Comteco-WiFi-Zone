import React from "react";
import { Paper, Typography, Box } from "@mui/material";
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";

export default function GraficoTendencia({ datos }) {
    return (
        <Paper elevation={3} sx={{ p: 3, borderRadius: 3, backgroundColor: "white", boxShadow: "0 2px 12px rgba(0,0,0,0.08)" }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: "#333" }}>
                Tendencia de Reportes por Día
            </Typography>
            <Box sx={{ height: 280 }}>
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={datos} margin={{ top: 10, right: 20, bottom: 0, left: 0 }}>
                        <defs>
                            <linearGradient id="colorReportes" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#b71c1c" stopOpacity={0.25} />
                                <stop offset="95%" stopColor="#b71c1c" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="dia" tick={{ fontSize: 12 }} />
                        <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
                        <Tooltip formatter={(v) => [`${v}`, "Reportes"]} />
                        <Area
                            type="monotone"
                            dataKey="total"
                            stroke="#b71c1c"
                            strokeWidth={3}
                            fill="url(#colorReportes)"
                            dot={{ r: 5, fill: "#b71c1c" }}
                            activeDot={{ r: 7 }}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </Box>
        </Paper>
    );
}
