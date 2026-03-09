import React from "react";
import { Grid, TextField, Button, Typography } from "@mui/material";

/**
 * Formulario para crear o editar una zona de WiFi.
 */
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
          <TextField
            className="zona-input"
            fullWidth
            label="Nombre de la Zona"
            value={zona.nombre}
            onChange={(e) => onChange("nombre", e.target.value)}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            className="zona-input"
            fullWidth
            label="Dirección"
            value={zona.direccion}
            onChange={(e) => onChange("direccion", e.target.value)}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            className="zona-input"
            fullWidth
            label="Capacidad (Dispositivos)"
            type="number"
            value={zona.capacidad || 0}
            onChange={(e) => onChange("capacidad", e.target.value)}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            className="zona-input"
            fullWidth
            label="Rango de Cobertura (Metros)"
            type="number"
            value={zona.rango || 0}
            onChange={(e) => onChange("rango", e.target.value)}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            className="zona-input"
            fullWidth
            label="URL de la Foto / Icono"
            value={zona.foto || ''}
            onChange={(e) => onChange("foto", e.target.value)}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            className="zona-input"
            fullWidth
            label="Velocidad (Mbps)"
            type="number"
            value={zona.velocidad || 0}
            onChange={(e) => onChange("velocidad", e.target.value)}
          />
        </Grid>

        <Grid item xs={12} className="zona-btns" sx={{ display: 'flex', gap: 1, mt: 2 }}>
          <Button variant="contained" color="primary" onClick={onSave} sx={{ flex: 1 }}>
            Guardar
          </Button>

          {zona.id && (
            <Button variant="outlined" color="error" onClick={onDelete}>
              Eliminar
            </Button>
          )}

          {zona.id && (
            <Button
              variant="contained"
              color={zona.estado === 'MANTENIMIENTO' ? 'secondary' : 'warning'}
              onClick={onToggleMantenimiento}
            >
              {zona.estado === 'MANTENIMIENTO' ? 'Reactivar' : 'Mantenimiento'}
            </Button>
          )}
        </Grid>
      </Grid>
    </>
  );
}
