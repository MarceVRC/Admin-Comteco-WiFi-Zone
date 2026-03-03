import React, { useState } from "react";
import { Box, Paper, Typography } from "@mui/material";
import Layout from "../components/Layout";
import "leaflet/dist/leaflet.css";
import "./Zonas.css";

import MapaZonas from "../components/MapaZonas";
import FormularioZona from "../components/FormularioZona";

import { obtenerZonas, crearZona, actualizarZona, eliminarZona } from "../services/zonasService";

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


const initialZonas = [];

export default function Zonas() {
  const [zonas, setZonas] = useState(initialZonas);
  const [zonaSeleccionada, setZonaSeleccionada] = useState(null);
  const [hoverPos, setHoverPos] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const API_URL = "http://localhost:3000/zonas";


  const cargarZonas = async () => {
    try {
      setLoading(true);
      setError(null);
      const datos = await obtenerZonas(API_URL);
      setZonas(datos);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    cargarZonas();
  }, []);

  const actualizarZona = (campo, valor) => {
    setZonaSeleccionada((prev) => ({ ...prev, [campo]: valor }));
  };


  const guardarZona = async () => {
    if (!zonaSeleccionada || !zonaSeleccionada.nombre) return;

    const latVal = zonaSeleccionada.lat || (zonaSeleccionada.position && zonaSeleccionada.position[0]);
    const lngVal = zonaSeleccionada.lng || (zonaSeleccionada.position && zonaSeleccionada.position[1]);

    const cuerpo = {
      nombre: zonaSeleccionada.nombre,
      direccion: zonaSeleccionada.direccion,
      capacidad: Number(zonaSeleccionada.capacidad),
      rango: Number(zonaSeleccionada.rango),
      lat: latVal,
      lng: lngVal,
      foto: zonaSeleccionada.foto || null,
    };

    try {
      if (zonaSeleccionada.id) {
        await actualizarZona(API_URL, zonaSeleccionada.id, cuerpo);
      } else {
        await crearZona(API_URL, cuerpo);
      }
      await cargarZonas();
    } catch (err) {
      setError(err.message);
    }

    setZonaSeleccionada(null);
    setHoverPos(null);
  };

  const eliminarZonaLocal = async () => {
    if (!zonaSeleccionada) return;
    try {
      if (zonaSeleccionada.id) {
        await eliminarZona(API_URL, zonaSeleccionada.id);
        await cargarZonas();
      }
    } catch (err) {
      setError(err.message);
    }
    setZonaSeleccionada(null);
  };

  const alternarMantenimiento = async () => {
    if (!zonaSeleccionada) return;
    const nuevo = zonaSeleccionada.estado === 'MANTENIMIENTO' ? 'ACTIVA' : 'MANTENIMIENTO';
    setZonaSeleccionada((prev) => ({ ...prev, estado: nuevo }));
    setZonas((prev) =>
      prev.map((z) => (z.id === zonaSeleccionada.id ? { ...z, estado: nuevo } : z))
    );
    try {
      if (zonaSeleccionada.id) {
        await actualizarZona(API_URL, zonaSeleccionada.id, { estado: nuevo });
      }
    } catch (err) {
      setError(err.message);
    }
  };


  return (
    <Layout>
      <Box className="zona-container">
        {error && (
          <Typography className="zona-error">
            {error}
          </Typography>
        )}
        {loading && (
          <Typography className="zona-loading">
            Cargando zonas...
          </Typography>
        )}

        <Paper className="zona-map-paper" elevation={3}>
          <MapaZonas
            className="mapa-container"
            zonas={zonas}
            zonaSeleccionada={zonaSeleccionada}
            setZonaSeleccionada={setZonaSeleccionada}
            hoverPos={hoverPos}
            setHoverPos={setHoverPos}
          />
        </Paper>

        <Paper className="zona-form-paper" elevation={3}>
          <FormularioZona
            zona={zonaSeleccionada}
            onChange={actualizarZona}
            onSave={guardarZona}
            onDelete={eliminarZonaLocal}
            onToggleMantenimiento={alternarMantenimiento}
          />
        </Paper>
      </Box>
    </Layout>
  );
}