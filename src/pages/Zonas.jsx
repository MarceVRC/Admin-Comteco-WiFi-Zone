import React from "react";
import { Box, Paper, Typography } from "@mui/material";
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

/**
 * Configuración de iconos predeterminados para Leaflet.
 */
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
});

/**
 * Página principal de administración de Zonas.
 * Utiliza el hook useZonas para gestionar toda la lógica de negocio y estado.
 */
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
      <Box className="zona-container">
        {error && (
          <Typography className="zona-error" sx={{ color: 'red', mb: 2, fontWeight: 'bold' }}>
            {`Error: ${error}`}
          </Typography>
        )}

        {cargando && (
          <Typography className="zona-loading" sx={{ mb: 2, fontStyle: 'italic' }}>
            Cargando información de las zonas...
          </Typography>
        )}

        <Paper className="zona-map-paper" elevation={4} sx={{ borderRadius: 0, overflow: 'hidden' }}>
          <MapaZonas
            className="mapa-container"
            zonas={zonas}
            zonaSeleccionada={zonaSeleccionada}
            setZonaSeleccionada={setZonaSeleccionada}
            hoverPos={hoverPos}
            setHoverPos={setHoverPos}
          />
        </Paper>

        <Paper className="zona-form-paper" elevation={4} sx={{ p: 3, borderRadius: 0 }}>
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
