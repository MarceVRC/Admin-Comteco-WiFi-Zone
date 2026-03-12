import React from "react";
import { Paper, Typography, Box } from "@mui/material";

export default function TarjetaKPI({ titulo, valor, subtitulo, icono, color = "#CC0000" }) {
    return (
        <Paper
            elevation={3}
            sx={{
                borderRadius: 0,
                p: 2.5,
                display: "flex",
                alignItems: "center",
                gap: 2,
                backgroundColor: "white",
                boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
                borderLeft: `5px solid ${color}`,
                height: "100%",
            }}
        >
            {icono && (
                <Box
                    sx={{
                        width: 48,
                        height: 48,
                        borderRadius: "50%",
                        backgroundColor: `${color}18`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color,
                        flexShrink: 0,
                    }}
                >
                    {icono}
                </Box>
            )}
            <Box>
                <Typography variant="caption" color="text.secondary" sx={{ textTransform: "uppercase", letterSpacing: 1, fontWeight: 600 }}>
                    {titulo}
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 800, color, lineHeight: 1.1 }}>
                    {valor}
                </Typography>
                {subtitulo && (
                    <Typography variant="caption" color="text.secondary">
                        {subtitulo}
                    </Typography>
                )}
            </Box>
        </Paper>
    );
}
