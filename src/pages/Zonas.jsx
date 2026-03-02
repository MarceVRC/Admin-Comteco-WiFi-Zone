import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import L from "leaflet";
import { Box, Paper, Typography, TextField, Button, Grid } from "@mui/material";
import Layout from "../components/Layout";
import "leaflet/dist/leaflet.css";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
});

// Datos mock iniciales
const initialZonas = [
  { id: 1, nombre: "Plaza 14 de Sep.", direccion: "Calle Falsa 123", capacidad: 50, position: [-17.393, -66.156], foto: null },
  { id: 2, nombre: "Parque Pulpo", direccion: "Av. Principal 456", capacidad: 30, position: [-17.392, -66.157], foto: null },
];

export default function Zonas() {
  const [zonas, setZonas] = useState(initialZonas);
  const [selectedZona, setSelectedZona] = useState(null);
  const [hoverPos, setHoverPos] = useState(null); // cursor

  const handleChange = (field, value) => {
    setSelectedZona((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    if (!selectedZona) return;
    if (selectedZona.id) {
      setZonas((prev) =>
        prev.map((z) => (z.id === selectedZona.id ? selectedZona : z))
      );
    } else {
      setZonas((prev) => [
        ...prev,
        { ...selectedZona, id: Date.now(), position: selectedZona.position },
      ]);
    }
    setSelectedZona(null);
    setHoverPos(null);
  };

  const handleDelete = () => {
    if (!selectedZona) return;
    setZonas((prev) => prev.filter((z) => z.id !== selectedZona.id));
    setSelectedZona(null);
  };

  // Componente para manejar clicks y mouse move en el mapa
  const MapHandler = () => {
    useMapEvents({
      mousemove(e) {
        if (!selectedZona) setHoverPos([e.latlng.lat, e.latlng.lng]);
      },
      click(e) {
        setSelectedZona({
          nombre: "",
          direccion: "",
          capacidad: "",
          position: [e.latlng.lat, e.latlng.lng],
          foto: null,
        });
        setHoverPos(null);
      },
    });
    return null;
  };

  return (
    <Layout>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        {/* MAPA */}
        <Paper
          elevation={3}
          sx={{ borderRadius: 3, overflow: "hidden", mb: 2 }}
        >
          <MapContainer
            center={[-17.3925, -66.1565]}
            zoom={17}
            style={{ width: "100%", height: "300px", minHeight: "300px" }}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <MapHandler />
            {zonas.map((zona) => (
              <Marker
                key={zona.id}
                position={zona.position}
                eventHandlers={{ click: () => setSelectedZona(zona) }}
              >
                <Popup>{zona.nombre}</Popup>
              </Marker>
            ))}
            {/* Cursor dinámico */}
            {hoverPos && <Marker position={hoverPos} opacity={0.5}></Marker>}
          </MapContainer>
        </Paper>

        {/* CONTENEDOR DE EDICIÓN*/}
        <Paper
          elevation={3}
          sx={{
            padding: { xs: 2, sm: 3 },
            borderRadius: 3,
            backgroundColor: "white",
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
            maxWidth: 600,
          }}
        >
        {selectedZona ? (
          <>
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                marginBottom: 2,
              }}
            >
              {selectedZona.id ? "Editar Zona" : "Nueva Zona"}
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Nombre"
                  value={selectedZona.nombre}
                  onChange={(e) => handleChange("nombre", e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Dirección"
                  value={selectedZona.direccion}
                  onChange={(e) => handleChange("direccion", e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Capacidad"
                  type="number"
                  value={selectedZona.capacidad}
                  onChange={(e) => handleChange("capacidad", e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sx={{ display: "flex", gap: 1 }}>
                <Button variant="contained" color="primary" onClick={handleSave}>
                  Guardar
                </Button>
                {selectedZona.id && (
                  <Button variant="outlined" color="error" onClick={handleDelete}>
                    Eliminar
                  </Button>
                )}
              </Grid>
            </Grid>
          </>
        ) : (
          <Typography>
            Haz click en el mapa para agregar o seleccionar una zona.
          </Typography>
        )}
      </Paper>
      </Box>
    </Layout>
  );
}