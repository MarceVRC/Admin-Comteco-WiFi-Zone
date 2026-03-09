import { useState, useEffect, useCallback } from "react";
import * as zonasApi from "../api/zonasApi";

/**
 * Hook personalizado para gestionar la lógica de las zonas de WiFi.
 */
export const useZonas = () => {
    const [zonas, setZonas] = useState([]);
    const [zonaSeleccionada, setZonaSeleccionada] = useState(null);
    const [hoverPos, setHoverPos] = useState(null);
    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState(null);

    const cargarZonas = useCallback(async () => {
        try {
            setCargando(true);
            setError(null);
            const datos = await zonasApi.obtenerZonas();
            setZonas(datos);
        } catch (err) {
            setError(err.message);
        } finally {
            setCargando(false);
        }
    }, []);

    useEffect(() => {
        cargarZonas();
    }, [cargarZonas]);

    const manejarCambioInput = (campo, valor) => {
        setZonaSeleccionada((prev) => ({ ...prev, [campo]: valor }));
    };

    const guardarZona = async () => {
        if (!zonaSeleccionada || !zonaSeleccionada.nombre) return;

        const latVal = zonaSeleccionada.lat || (zonaSeleccionada.position && zonaSeleccionada.position[0]);
        const lngVal = zonaSeleccionada.lng || (zonaSeleccionada.position && zonaSeleccionada.position[1]);

        const latNum = Number(latVal);
        const lngNum = Number(lngVal);

        const cuerpo = {
            nombre: zonaSeleccionada.nombre,
            direccion: zonaSeleccionada.direccion || "",
            capacidad: Number(zonaSeleccionada.capacidad || 0),
            rango: Number(zonaSeleccionada.rango || 0),
            lat: isNaN(latNum) ? 0 : latNum,
            lng: isNaN(lngNum) ? 0 : lngNum,
            velocidad: Number(zonaSeleccionada.velocidad || 0),
        };

        if (zonaSeleccionada.estado) {
            cuerpo.estado = zonaSeleccionada.estado;
        }

        if (zonaSeleccionada.foto && typeof zonaSeleccionada.foto === 'string' && zonaSeleccionada.foto.trim() !== "") {
            cuerpo.foto = zonaSeleccionada.foto;
        }

        console.log('Enviando datos de zona:', cuerpo);

        try {
            if (zonaSeleccionada.id) {
                const res = await zonasApi.actualizarZona(zonaSeleccionada.id, cuerpo);
                console.log('Respuesta actualizar:', res);
            } else {
                const res = await zonasApi.crearZona(cuerpo);
                console.log('Respuesta crear:', res);
            }
            await cargarZonas();
            setZonaSeleccionada(null);
            setHoverPos(null);
        } catch (err) {
            setError(err.message);
        }
    };

    const eliminarZonaLocal = async () => {
        if (!zonaSeleccionada || !zonaSeleccionada.id) return;
        try {
            await zonasApi.eliminarZona(zonaSeleccionada.id);
            await cargarZonas();
            setZonaSeleccionada(null);
        } catch (err) {
            setError(err.message);
        }
    };

    const alternarMantenimiento = async () => {
        if (!zonaSeleccionada || !zonaSeleccionada.id) return;
        const nuevoEstado = zonaSeleccionada.estado === 'MANTENIMIENTO' ? 'ACTIVA' : 'MANTENIMIENTO';

        // Optimistic update
        setZonas((prev) =>
            prev.map((z) => (z.id === zonaSeleccionada.id ? { ...z, estado: nuevoEstado } : z))
        );

        try {
            const latVal = zonaSeleccionada.lat || (zonaSeleccionada.position && zonaSeleccionada.position[0]);
            const lngVal = zonaSeleccionada.lng || (zonaSeleccionada.position && zonaSeleccionada.position[1]);

            const latNum = Number(latVal);
            const lngNum = Number(lngVal);

            const cuerpo = {
                nombre: zonaSeleccionada.nombre,
                direccion: zonaSeleccionada.direccion || "",
                capacidad: Number(zonaSeleccionada.capacidad || 0),
                rango: Number(zonaSeleccionada.rango || 0),
                lat: isNaN(latNum) ? 0 : latNum,
                lng: isNaN(lngNum) ? 0 : lngNum,
                velocidad: Number(zonaSeleccionada.velocidad || 0),
                estado: nuevoEstado,
            };

            if (zonaSeleccionada.foto && typeof zonaSeleccionada.foto === 'string' && zonaSeleccionada.foto.trim() !== "") {
                cuerpo.foto = zonaSeleccionada.foto;
            }

            await zonasApi.actualizarZona(zonaSeleccionada.id, cuerpo);
            await cargarZonas();
        } catch (err) {
            setError(err.message);
            await cargarZonas(); // Revert on error
        }
    };

    return {
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
        cargarZonas,
    };
};
