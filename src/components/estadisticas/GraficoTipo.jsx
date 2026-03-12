import React from "react";
import { Paper, Typography, Box } from "@mui/material";
import {
    PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer,
} from "recharts";

const COLORS = ["#b71c1c", "#d32f2f", "#ef5350", "#e57373", "#ffcdd2"];

const RADIAN = Math.PI / 180;
const renderLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    if (percent < 0.05) return null;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    return (
        <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={13} fontWeight={700}>
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};

export default function GraficoTipo({ datos }) {
    return (
        <Paper elevation={3} sx={{ p: 3, borderRadius: 0, backgroundColor: "white", boxShadow: "0 2px 12px rgba(0,0,0,0.08)" }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: "#333" }}>
                Distribución por Tipo de Problema
            </Typography>
            <Box sx={{ height: 280 }}>
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={datos}
                            cx="50%"
                            cy="45%"
                            innerRadius={60}
                            outerRadius={100}
                            dataKey="value"
                            labelLine={false}
                            label={renderLabel}
                        >
                            {datos.map((_, i) => (
                                <Cell key={i} fill={COLORS[i % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip formatter={(v, n) => [`${v} reportes`, n]} />
                        <Legend iconType="circle" iconSize={10} />
                    </PieChart>
                </ResponsiveContainer>
            </Box>
        </Paper>
    );
}
