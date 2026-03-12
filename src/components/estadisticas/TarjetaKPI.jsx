import React from "react";
import { Paper, Typography, Box, LinearProgress } from "@mui/material";

export default function TarjetaKPI({ titulo, valor, subtitulo, icono, color = "#CC0000", porcentaje }) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 5,
        backgroundColor: "#fff",
        border: "1px solid rgba(0,0,0,0.06)",
        position: "relative",
        overflow: "hidden",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        "&:hover": {
          boxShadow: "0 20px 40px rgba(0,0,0,0.06)",
          transform: "translateY(-6px)",
          borderColor: color,
        }
      }}
    >
      <Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
          <Box
            sx={{
              p: 1.5,
              borderRadius: "16px",
              backgroundColor: `${color}12`,
              color: color,
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            {icono}
          </Box>
        </Box>

        <Typography variant="overline" sx={{ fontWeight: 800, color: "text.secondary", letterSpacing: 1.5, display: "block", mb: 0.5, lineHeight: 1.2 }}>
          {titulo}
        </Typography>
        
        <Typography variant="h4" sx={{ fontWeight: 900, color: "#1a1a1a", letterSpacing: "-1.5px" }}>
            {valor}
        </Typography>
      </Box>

      <Box sx={{ mt: 3 }}>
        {porcentaje !== undefined && (
          <Box sx={{ mb: 2 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
              <Typography variant="caption" sx={{ fontWeight: 800, color: "text.secondary", fontSize: '0.7rem', textTransform: 'uppercase' }}>
                Estabilidad
              </Typography>
              <Typography variant="caption" sx={{ fontWeight: 900, color: color, fontSize: '0.75rem' }}>
                {porcentaje}%
              </Typography>
            </Box>
            <LinearProgress 
                variant="determinate" 
                value={porcentaje} 
                sx={{ 
                    height: 6, 
                    borderRadius: 3, 
                    bgcolor: `${color}15`,
                    "& .MuiLinearProgress-bar": { 
                        bgcolor: color,
                        borderRadius: 3
                    }
                }} 
            />
          </Box>
        )}
        <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 600, fontSize: '0.75rem', display: 'block', lineHeight: 1.4, opacity: 0.8 }}>
          {subtitulo}
        </Typography>
      </Box>
    </Paper>
  );
}
