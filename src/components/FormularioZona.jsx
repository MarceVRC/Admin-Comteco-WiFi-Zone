import React from "react";
import { Grid, TextField, Button, Typography } from "@mui/material";

export default function FormularioZona({ zona, onChange, onSave, onDelete, onToggleMantenimiento }) {
  if (!zona) {
    return <Typography>Haz click en el mapa para agregar o seleccionar una zona.</Typography>;
  }

  return (
    <>
      <Typography variant="h6" className="zona-header">
        {zona.id ? "Editar Zona" : "Nueva Zona"}
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            className="zona-input"
            fullWidth
            label="Nombre"
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
            label="Capacidad"
            type="number"
            value={zona.capacidad || ''}
            onChange={(e) => onChange("capacidad", e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            className="zona-input"
            fullWidth
            label="Rango"
            type="number"
            value={zona.rango || ''}
            onChange={(e) => onChange("rango", e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            className="zona-input"
            fullWidth
            label="URL de foto / icono del marcador"
            value={zona.foto || ''}
            onChange={(e) => onChange("foto", e.target.value)}
          />
        </Grid>
        <Grid item xs={12} className="zona-btns">
          <Button variant="contained" color="primary" onClick={onSave}>
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

const inputStyle = {
  '& .MuiOutlinedInput-root': {
    '& fieldset': { borderColor: 'red' },
    '&:hover fieldset': { borderColor: 'darkred' },
    '&.Mui-focused fieldset': { borderColor: 'red' },
  },
};
