import { Box, FormControl, InputLabel, Select, MenuItem, Button } from "@mui/material";

export default function FiltrosReportes({ mes, setMes, zona, setZona }) {
  return (
    <Box sx={{ 
        display: "flex",
        flexWrap: "wrap",
        gap: 2,
        marginBottom: 3 }}>
      <FormControl size="small">
        <InputLabel>Mes</InputLabel>
        <Select value={mes} label="Mes" onChange={(e) => setMes(e.target.value)}>
          <MenuItem value="02-2026">02/2026</MenuItem>
          <MenuItem value="01-2026">01/2026</MenuItem>
          <MenuItem value="12-2025">12/2025</MenuItem>
        </Select>
      </FormControl>

      <FormControl size="small" sx={{ minWidth: 180 }}>
        <InputLabel>Zona Wi-Fi</InputLabel>
        <Select value={zona} label="Zona Wi-Fi" onChange={(e) => setZona(e.target.value)}>
          <MenuItem value="todas">Todas las zonas</MenuItem>
          <MenuItem value="plaza14">Plaza 14 de Sep.</MenuItem>
          <MenuItem value="pulpo">Parque Pulpo</MenuItem>
        </Select>
      </FormControl>

      <Button
        variant="contained"
        sx={{ backgroundColor: "#c62828", "&:hover": { backgroundColor: "#b71c1c" } }}
      >
        Filtrar
      </Button>
    </Box>
  );
}