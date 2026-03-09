import React from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, Circle } from "react-leaflet";
import L from "leaflet";

import cRed from "../../assets/c-red.png";

/**
 * Crea un icono personalizado para el marcador del mapa.
 */
const crearIcono = (url, zona) => {
  const opciones = {
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  };

  if (zona && zona.estado === 'MANTENIMIENTO') {
    opciones.className = 'grayscale-icon';
  }

  // Siempre retornamos el icono default cRed ignorando la url del backend
  return new L.Icon({ iconUrl: cRed, ...opciones });
};

/**
 * Componente interno para manejar eventos del mapa.
 */
const EventosMapa = ({ setZonaSeleccionada, setHoverPos }) => {
  useMapEvents({
    mousemove(e) {
      setHoverPos((prev) => (prev ? [e.latlng.lat, e.latlng.lng] : prev));
    },
    click(e) {
      setZonaSeleccionada({
        nombre: "",
        direccion: "",
        capacidad: "",
        rango: "",
        lat: e.latlng.lat,
        lng: e.latlng.lng,
        position: [e.latlng.lat, e.latlng.lng],
        foto: "",
        velocidad: 0,
      });
      setHoverPos(null);
    },
  });
  return null;
};

/**
 * Componente principal del Mapa de Zonas.
 */
export default function MapaZonas({
  className,
  zonas,
  zonaSeleccionada,
  setZonaSeleccionada,
  hoverPos,
  setHoverPos
}) {
  return (
    <MapContainer
      className={className}
      center={[-17.3925, -66.1565]}
      zoom={17}
      zoomControl={false}
      attributionControl={false}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      <EventosMapa setZonaSeleccionada={setZonaSeleccionada} setHoverPos={setHoverPos} />

      {zonas
        .filter((z) => (z.estado || '').toUpperCase() !== 'DESHABILITADA')
        .map((z) => (
          <React.Fragment key={z.id}>
            <Marker
              position={z.position}
              icon={crearIcono(z.foto, z)}
              eventHandlers={{ click: () => setZonaSeleccionada(z) }}
            >
              <Popup>{z.nombre}</Popup>
            </Marker>

            {z.rango != null && (
              <Circle
                center={z.position}
                radius={Number(z.rango)}
                pathOptions={{
                  color: z.estado === 'MANTENIMIENTO' ? 'grey' : 'red',
                  fillOpacity: 0.1,
                }}
              />
            )}
          </React.Fragment>
        ))}

      {zonaSeleccionada && zonaSeleccionada.position && (
        <Marker
          position={zonaSeleccionada.position}
          draggable
          icon={crearIcono(zonaSeleccionada.foto)}
          eventHandlers={{
            dragend: (e) => {
              const { lat, lng } = e.target.getLatLng();
              setZonaSeleccionada((prev) => ({
                ...prev,
                position: [lat, lng],
                lat,
                lng,
              }));
            },
          }}
        />
      )}

      {hoverPos && <Marker position={hoverPos} opacity={0.5} />}
    </MapContainer>
  );
}
