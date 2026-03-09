import { Box, FormControl, InputLabel, Select, MenuItem, Button } from "@mui/material";

export default function FiltrosReportes({ mes, setMes, zona, setZona, zonas = [] }) {
  return (
    <Box sx={{
      display: "flex",
      flexWrap: "wrap",
      gap: 2,
      marginBottom: 3
    }}>
      <FormControl size="small">
        <InputLabel>Mes</InputLabel>
        <Select value={mes} label="Mes" onChange={(e) => setMes(e.target.value)}>
          <MenuItem value="todos">Todos los meses</MenuItem>
          <MenuItem value="03-2026">03/2026</MenuItem>
          <MenuItem value="02-2026">02/2026</MenuItem>
          <MenuItem value="01-2026">01/2026</MenuItem>
        </Select>
      </FormControl>

      <FormControl size="small" sx={{ minWidth: 180 }}>
        <InputLabel>Zona Wi-Fi</InputLabel>
        <Select value={zona} label="Zona Wi-Fi" onChange={(e) => setZona(e.target.value)}>
          <MenuItem value="todas">Todas las zonas</MenuItem>
          {zonas.map((z) => (
            <MenuItem key={z.id} value={z.id}>
              {z.nombre}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}