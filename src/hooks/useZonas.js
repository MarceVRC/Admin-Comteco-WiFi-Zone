import { useState, useEffect, useCallback } from "react";
import * as zonasApi from "../api/zonasApi";
import * as uploadApi from "../api/uploadService";
import { env } from "../config/env";

const normalizarFotoParaGuardar = (foto) => {
    if (!foto || typeof foto !== 'string') return foto;
    if (foto.startsWith(env.API_BASE_URL)) {
        return foto.replace(env.API_BASE_URL, '');
    }
    try {
        const parsed = new URL(foto);
        if (parsed.pathname.startsWith('/uploads')) {
            return parsed.pathname;
        }
    } catch (error) {
        // no es una URL completa, conservar como venga
    }
    return foto;
};

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

        setCargando(true);
        setError(null);

        try {
            let fotoUrl = zonaSeleccionada.foto;

            // Si hay un archivo pendiente de subir, se envía al backend local
            if (zonaSeleccionada.archivoFoto) {
                console.log('Subiendo imagen al backend...');
                fotoUrl = await uploadApi.subirImagenAlBackend(zonaSeleccionada.archivoFoto);
                console.log('Imagen subida con éxito:', fotoUrl);
            }

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

            if (fotoUrl && typeof fotoUrl === 'string' && fotoUrl.trim() !== "") {
                cuerpo.foto = normalizarFotoParaGuardar(fotoUrl);
            }

            console.log('Enviando datos de zona:', cuerpo);

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
            console.error('Error detallado al guardar:', err);
            setError(err.message);
        } finally {
            setCargando(false);
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
                cuerpo.foto = normalizarFotoParaGuardar(zonaSeleccionada.foto);
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
