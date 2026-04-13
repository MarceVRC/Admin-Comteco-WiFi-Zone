import React from "react";
import { Stack, Box, Typography, Chip } from "@mui/material";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";

export default function ResumenTarjetas({ resumen, tarjetasResumen }) {
  return (
    <Stack direction={{ xs: "column", md: "row" }} justifyContent="space-between" alignItems={{ xs: "flex-start", md: "center" }} spacing={2} sx={{ mb: 3 }}>
      <Box>
        <Stack direction="row" spacing={1.25} alignItems="center" sx={{ mb: 1 }}>
          <Typography variant="h6" sx={{ fontWeight: 800 }}>
            Imagenes del carrusel
          </Typography>
        </Stack>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          Desde este bloque puedes cargar imagenes, ordenar la biblioteca y eliminar piezas del carrusel.
        </Typography>
      </Box>
      <Chip icon={<ImageOutlinedIcon />} label={`${resumen.total} imagenes registradas`} sx={{ fontWeight: 700 }} />
    </Stack>
  );
}
