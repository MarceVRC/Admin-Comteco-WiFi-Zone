import React from "react";
import { Grid, TextField, Button, Typography, Box } from "@mui/material";

export default function FormularioZona({
  zona,
  onChange,
  onSave,
  onDelete,
  onToggleMantenimiento
}) {
  if (!zona) {
    return <Typography>Haz clic en el mapa para agregar o seleccionar una zona.</Typography>;
  }

  return (
    <>
      <Typography variant="h6" className="zona-header" sx={{ mb: 2, fontWeight: 'bold' }}>
        {zona.id ? "Editar Zona" : "Nueva Zona"}
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="body2" sx={{ mb: 1, fontWeight: 'medium' }}>Nombre de la Zona</Typography>
          <TextField
            fullWidth
            label="Ej: Zona Central"
            value={zona.nombre || ''}
            onChange={(e) => onChange("nombre", e.target.value)}
          />
        </Grid>

        <Grid item xs={12}>
          <Typography variant="body2" sx={{ mb: 1, fontWeight: 'medium' }}>Dirección (Opcional)</Typography>
          <TextField
            fullWidth
            label="Calle, Avenida, etc."
            value={zona.direccion || ''}
            onChange={(e) => onChange("direccion", e.target.value)}
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          <Typography variant="body2" sx={{ mb: 1, fontWeight: 'medium' }}>Capacidad</Typography>
          <TextField
            fullWidth
            type="number"
            value={zona.capacidad === 0 ? '' : (zona.capacidad || '')}
            onChange={(e) => onChange("capacidad", e.target.value === '' ? 0 : Number(e.target.value))}
            onFocus={(e) => e.target.select()}
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          <Typography variant="body2" sx={{ mb: 1, fontWeight: 'medium' }}>Rango (Metros)</Typography>
          <TextField
            fullWidth
            type="number"
            value={zona.rango === 0 ? '' : (zona.rango || '')}
            onChange={(e) => onChange("rango", e.target.value === '' ? 0 : Number(e.target.value))}
            onFocus={(e) => e.target.select()}
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          <Typography variant="body2" sx={{ mb: 1, fontWeight: 'medium' }}>Velocidad (Mbps)</Typography>
          <TextField
            fullWidth
            type="number"
            value={zona.velocidad === 0 ? '' : (zona.velocidad || '')}
            onChange={(e) => onChange("velocidad", e.target.value === '' ? 0 : Number(e.target.value))}
            onFocus={(e) => e.target.select()}
          />
        </Grid>

        <Grid item xs={12}>
          <Typography variant="body2" sx={{ mb: 1, fontWeight: 'medium' }}>Foto de la Zona</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
            {zona.foto && (
              <Box
                component="img"
                src={zona.foto}
                alt="Preview"
                sx={{ width: 64, height: 64, borderRadius: 1, objectFit: 'cover', border: '1px solid #CC0000' }}
              />
            )}
            <Button
              variant="outlined"
              component="label"
              fullWidth
              sx={{
                height: 56,
                color: '#CC0000',
                borderColor: '#CC0000',
                fontWeight: 'bold',
                '&:hover': { borderColor: '#990000' }
              }}
            >
              {zona.foto ? "Cambiar Imagen" : "Subir Imagen"}
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    onChange("archivoFoto", e.target.files[0]);
                    const reader = new FileReader();
                    reader.onload = (event) => onChange("fotoPreview", event.target.result);
                    reader.readAsDataURL(e.target.files[0]);
                  }
                }}
              />
            </Button>
          </Box>
        </Grid>

        <Grid item xs={12} sx={{ display: 'flex', gap: 1, mt: 2 }}>
          <Button
            variant="contained"
            onClick={onSave}
            sx={{ flex: 2, py: 1.5 }}
          >
            {zona.id ? "Actualizar Zona" : "Registrar Zona"}
          </Button>

          {zona.id && (
            <Button
              variant="outlined"
              color="error"
              onClick={onDelete}
            >
              Borrar
            </Button>
          )}

          {zona.id && (
            <Button
              variant="contained"
              color={zona.estado === 'MANTENIMIENTO' ? 'success' : 'warning'}
              onClick={onToggleMantenimiento}
            >
              {zona.estado === 'MANTENIMIENTO' ? 'Activar' : 'Mant.'}
            </Button>
          )}
        </Grid>
      </Grid>
    </>
  );
}
