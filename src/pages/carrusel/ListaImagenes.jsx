import React from "react";
import { Paper, Stack, Box, Typography, Chip, Button, IconButton } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

export default function ListaImagenes({ imagenes, imagenActiva, moverImagen, eliminarImagen, setPreviewImagen, setOpenPreview }) {
  return (
    <Stack spacing={2}>
      {imagenes.map((imagen, index) => (
        <Paper
          key={imagen.id}
          elevation={0}
          sx={{
            p: 1.5,
            borderRadius: 3,
            border: imagenActiva?.id === imagen.id ? "1px solid rgba(204, 0, 0, 0.35)" : "1px solid rgba(15, 23, 42, 0.08)",
            backgroundColor: imagenActiva?.id === imagen.id ? "rgba(204, 0, 0, 0.03)" : "#fff",
          }}
        >
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2} alignItems={{ xs: "flex-start", sm: "center" }}>
            <Box component="img" src={imagen.url} alt={imagen.nombre} sx={{ width: { xs: "100%", sm: 140 }, height: { xs: 150, sm: 90 }, objectFit: "cover", borderRadius: 2, border: "1px solid rgba(15, 23, 42, 0.08)" }} />
            <Box sx={{ flexGrow: 1, minWidth: 0 }}>
              <Stack direction={{ xs: "column", md: "row" }} spacing={1} justifyContent="space-between" alignItems={{ xs: "flex-start", md: "center" }}>
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>
                    {index + 1}. {imagen.nombre}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    Tamaño: {imagen.tamano} MB
                  </Typography>
                  {imagen.redirectUrl ? (
                    <Typography variant="caption" sx={{ color: "text.secondary", display: "block" }} noWrap>
                      {imagen.redirectUrl}
                    </Typography>
                  ) : null}
                </Box>
                <Chip label={imagen.estado} size="small" sx={{ fontWeight: 700 }} />
              </Stack>
            </Box>
            <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ gap: 1 }}>
              <Button variant={imagenActiva?.id === imagen.id ? "contained" : "outlined"} size="small" onClick={() => { setPreviewImagen(imagen); setOpenPreview(true); }}>
                Ver
              </Button>
              <IconButton size="small" onClick={() => moverImagen(imagen.id, "up")} disabled={index === 0}>
                <ArrowUpwardIcon fontSize="small" />
              </IconButton>
              <IconButton size="small" onClick={() => moverImagen(imagen.id, "down")} disabled={index === imagenes.length - 1}>
                <ArrowDownwardIcon fontSize="small" />
              </IconButton>
              <IconButton size="small" color="error" onClick={() => eliminarImagen(imagen.id)}>
                <DeleteOutlineIcon fontSize="small" />
              </IconButton>
            </Stack>
          </Stack>
        </Paper>
      ))}
    </Stack>
  );
}
