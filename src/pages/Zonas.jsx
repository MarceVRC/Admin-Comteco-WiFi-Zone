import React from "react";
import { Box, Paper, Typography, CircularProgress, Alert } from "@mui/material";
import Layout from "../components/common/Layout";
import MapaZonas from "../components/zonas/MapaZonas";
import FormularioZona from "../components/zonas/FormularioZona";
import { useZonas } from "../hooks/useZonas";
import "leaflet/dist/leaflet.css";
import "./Zonas.css";
import L from "leaflet";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
});

export default function Zonas() {
  const {
    zonas,
    zonaSeleccionada,
    setZonaSeleccionada,
    hoverPos,
    setHoverPos,
    cargando,
    error,
    manejarCambioInput,
    guardarZona,
    eliminarZonaLocal,
    alternarMantenimiento,
  } = useZonas();

  return (
    <Layout>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, py: 2, width: '100%' }}>
        
        {error && (
          <Alert severity="error" sx={{ width: '100%', maxWidth: 1000, borderRadius: 3 }}>
            {error}
          </Alert>
        )}

        {cargando && (
          <CircularProgress sx={{ color: '#CC0000', mt: 4 }} />
        )}

        {/* Mapa de Zonas - Reducido y Centrado */}
        <Paper 
          elevation={3} 
          sx={{ 
            width: '100%', 
            maxWidth: 1000, 
            borderRadius: 4, 
            overflow: 'hidden',
            boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
          }}
        >
          <MapaZonas
            className="mapa-container"
            zonas={zonas}
            zonaSeleccionada={zonaSeleccionada}
            setZonaSeleccionada={setZonaSeleccionada}
            hoverPos={hoverPos}
            setHoverPos={setHoverPos}
          />
        </Paper>

        {/* Formulario de Administración */}
        <Paper 
          elevation={3} 
          sx={{ 
            p: { xs: 3, md: 5 }, 
            width: '100%', 
            maxWidth: 1000, 
            borderRadius: 4,
            bgcolor: 'white'
          }}
        >
          <FormularioZona
            zona={zonaSeleccionada}
            onChange={manejarCambioInput}
            onSave={guardarZona}
            onDelete={eliminarZonaLocal}
            onToggleMantenimiento={alternarMantenimiento}
          />
        </Paper>
      </Box>
    </Layout>
  );
}
