import React from "react";
import { Paper, Typography, Box } from "@mui/material";
import {
    PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer,
} from "recharts";

const COLORS = ["#b71c1c", "#d32f2f", "#ef5350", "#ff8a80", "#ffcdd2"];

const RADIAN = Math.PI / 180;
const renderLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    if (percent < 0.05) return null;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    return (
        <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={14} fontWeight={800}>
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};

export default function GraficoTipo({ datos }) {
    return (
        <Paper elevation={0} sx={{ p: 4, backgroundColor: "white", borderRadius: 4, border: "1px solid rgba(0,0,0,0.06)", height: "100%" }}>
            <Box sx={{ mb: 4 }}>
                <Typography variant="h6" sx={{ fontWeight: 800, color: "#1a1a1a" }}>
                    Tipología de Incidentes
                </Typography>
                <Typography variant="caption" color="text.secondary">
                    Desglose por categoría técnica de reporte
                </Typography>
            </Box>

            <Box sx={{ height: 400 }}>
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={datos}
                            cx="50%"
                            cy="45%"
                            innerRadius={80}
                            outerRadius={120}
                            dataKey="value"
                            labelLine={false}
                            label={renderLabel}
                            stroke="none"
                        >
                            {datos.map((_, i) => (
                                <Cell key={i} fill={COLORS[i % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip 
                            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 8px 24px rgba(0,0,0,0.1)' }}
                        />
                        <Legend verticalAlign="bottom" iconType="circle" iconSize={10} wrapperStyle={{ paddingTop: '20px' }} />
                    </PieChart>
                </ResponsiveContainer>
            </Box>
        </Paper>
    );
}
