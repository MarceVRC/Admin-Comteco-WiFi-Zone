import React, { useEffect, useMemo, useRef, useState } from "react";
import { Alert, Box, Paper, Stack, LinearProgress, Typography, Chip, Button, IconButton } from "@mui/material";
import ViewCarouselIcon from "@mui/icons-material/ViewCarousel";
import TuneIcon from "@mui/icons-material/Tune";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Layout from "../components/common/Layout";
import { subirImagenACloudinary } from "../api/cloudinaryService";
import { crearAd, obtenerAds, cambiarOrdenAd, eliminarAd } from "../api/adsApi";

import ResumenTarjetas from "./carrusel/ResumenTarjetas";
import ListaImagenes from "./carrusel/ListaImagenes";
import ModalPreview from "./carrusel/ModalPreview";
import ModalUpload from "./carrusel/ModalUpload";

const crearPlaceholder = (titulo, subtitulo, colorA, colorB) => {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="700" viewBox="0 0 1200 700">
      <defs>
        <linearGradient id="bg" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stop-color="${colorA}" />
          <stop offset="100%" stop-color="${colorB}" />
        </linearGradient>
      </defs>
      <rect width="1200" height="700" rx="36" fill="url(#bg)" />
      <circle cx="1020" cy="110" r="120" fill="rgba(255,255,255,0.14)" />
      <circle cx="150" cy="580" r="160" fill="rgba(255,255,255,0.09)" />
      <text x="80" y="250" fill="#ffffff" font-size="74" font-family="Arial, sans-serif" font-weight="700">${titulo}</text>
      <text x="80" y="330" fill="rgba(255,255,255,0.92)" font-size="34" font-family="Arial, sans-serif">${subtitulo}</text>
      <rect x="80" y="410" width="250" height="64" rx="20" fill="rgba(255,255,255,0.16)" stroke="rgba(255,255,255,0.32)" />
      <text x="120" y="452" fill="#ffffff" font-size="28" font-family="Arial, sans-serif">COMTECO WiFi Zone</text>
    </svg>`;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
};

const imagenesIniciales = [
  {
    id: "demo-1",
    nombre: "promo-fibra-hogar.jpg",
    tamano: 2.4,
    dimensiones: "1920 x 1080",
    estado: "Publicada",
    url: crearPlaceholder("Promo Fibra Hogar", "Campana principal para zonas de alto trafico", "#7a0000", "#cc0000"),
    origen: "mock",
  },
  {
    id: "demo-2",
    nombre: "packs-empresariales.png",
    tamano: 1.8,
    dimensiones: "1600 x 900",
    estado: "Programada",
    url: crearPlaceholder("Planes Empresariales", "Creatividad secundaria para lobby y puntos premium", "#1d3557", "#457b9d"),
    origen: "mock",
  },
  {
    id: "demo-3",
    nombre: "beneficios-app.webp",
    tamano: 1.2,
    dimensiones: "1200 x 1200",
    estado: "Borrador",
    url: crearPlaceholder("Gestion desde la app", "Pieza cuadrada para rotacion en carrusel", "#264653", "#2a9d8f"),
    origen: "mock",
  },
];

const tarjetasResumen = [
  {
    titulo: "Publicadas",
    icono: null, // El icono se maneja en el componente hijo si se requiere
    color: "#2e7d32",
    campo: "publicadas",
  },
  {
    titulo: "Total de piezas",
    icono: null,
    color: "#1565c0",
    campo: "total",
  },
  {
    titulo: "En rotacion",
    icono: null,
    color: "#CC0000",
    campo: "listas",
  },
];

export default function CarruselImagenes() {
  const inputRef = useRef(null);
  const urlsLocalesRef = useRef(new Set());
  const [imagenes, setImagenes] = useState(imagenesIniciales);
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");
  const [redirectUrl, setRedirectUrl] = useState("");
  const [cargandoSubida, setCargandoSubida] = useState(false);
  const [seleccionadaId, setSeleccionadaId] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [modalFile, setModalFile] = useState(null);
  const [modalRedirectUrl, setModalRedirectUrl] = useState("");
  const [cargandoLista, setCargandoLista] = useState(true);
  const [openPreview, setOpenPreview] = useState(false);
  const [previewImagen, setPreviewImagen] = useState(null);

  const cargarAds = async () => {
    try {
      const datos = await obtenerAds();
      const lista = Array.isArray(datos) ? datos : [];
      const mapeadas = lista.map((ad) => ({
        id: ad.id,
        nombre: ad.image_url?.split("/").pop() || `anuncio-${ad.id}`,
        tamano: 0,
        dimensiones: "Sin datos",
        estado: "Publicada",
        url: ad.image_url,
        origen: "backend",
        redirectUrl: ad.redirect_url || "",
      }));
      setImagenes(mapeadas);
      if (mapeadas.length && !mapeadas.some((img) => img.id === seleccionadaId)) {
        setSeleccionadaId(mapeadas[0].id);
      }
    } catch (err) {
      setError(err.message || "No se pudieron cargar los anuncios.");
    } finally {
      setCargandoLista(false);
    }
  };

  useEffect(() => {
    cargarAds();
  }, []);

  useEffect(() => {
    return () => {
      urlsLocalesRef.current.forEach((url) => URL.revokeObjectURL(url));
      urlsLocalesRef.current.clear();
    };
  }, []);

  useEffect(() => {
    if (!imagenes.length) {
      setSeleccionadaId(null);
      return;
    }

    if (!imagenes.some((imagen) => imagen.id === seleccionadaId)) {
      setSeleccionadaId(imagenes[0].id);
    }
  }, [imagenes, seleccionadaId]);

  const resumen = useMemo(() => {
    const publicadas = imagenes.filter((imagen) => imagen.estado === "Publicada").length;
    const programadas = imagenes.filter((imagen) => imagen.estado === "Programada").length;

    return {
      total: imagenes.length,
      publicadas,
      listas: publicadas + programadas,
    };
  }, [imagenes]);

  const imagenActiva = imagenes.find((imagen) => imagen.id === seleccionadaId) ?? imagenes[0] ?? null;

  const obtenerDimensionesArchivo = (archivo) => new Promise((resolve) => {
    const objectUrl = URL.createObjectURL(archivo);
    const imagen = new Image();

    imagen.onload = () => {
      resolve(`${imagen.naturalWidth} x ${imagen.naturalHeight}`);
      URL.revokeObjectURL(objectUrl);
    };

    imagen.onerror = () => {
      resolve("Pendiente de validar");
      URL.revokeObjectURL(objectUrl);
    };

    imagen.src = objectUrl;
  });

  const handleFileChange = (e) => {
    setModalFile(e.target.files && e.target.files[0] ? e.target.files[0] : null);
  };

  const handleModalUpload = async () => {
    if (!modalFile) return;
    setCargandoSubida(true);
    setError("");
    setMensaje("");
    try {
      const dimensiones = await obtenerDimensionesArchivo(modalFile);
      const imageUrl = await subirImagenACloudinary(modalFile);
      await crearAd({
        image_url: imageUrl,
        redirect_url: modalRedirectUrl.trim(),
      });
      const nuevaImagen = {
        id: `${modalFile.name}-${modalFile.lastModified}`,
        nombre: modalFile.name,
        tamano: Number((modalFile.size / (1024 * 1024)).toFixed(2)),
        dimensiones,
        estado: "Publicada",
        url: imageUrl,
        origen: "backend",
        redirectUrl: modalRedirectUrl.trim(),
      };
      await cargarAds();
      setMensaje("Imagen registrada correctamente en /ads.");
      setOpenModal(false);
      setModalFile(null);
      setModalRedirectUrl("");
    } catch (uploadError) {
      setError(uploadError.message || "No se pudo registrar la imagen en el servicio de anuncios.");
    } finally {
      setCargandoSubida(false);
    }
  };

  const eliminarImagen = async (id) => {
    setCargandoLista(true);
    setError("");
    setMensaje("");
    try {
      await eliminarAd(id);
      await cargarAds();
      setMensaje("Imagen eliminada correctamente.");
    } catch (err) {
      setError(err.message || "No se pudo eliminar la imagen.");
    } finally {
      setCargandoLista(false);
    }
  };

  const moverImagen = async (id, direccion) => {
    try {
      await cambiarOrdenAd(id, direccion);
      await cargarAds();
      setMensaje(direccion === "up" ? "Imagen movida hacia arriba." : "Imagen movida hacia abajo.");
    } catch (err) {
      setError(err.message || "No se pudo cambiar el orden.");
    }
  };

  return (
    <Layout>
      <Box sx={{ py: 2, width: "100%" }}>
        <Box sx={{ mb: 5, px: { xs: 1, md: 2 } }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}>
            <ViewCarouselIcon sx={{ color: "#CC0000", fontSize: 32 }} />
            <Typography variant="h4" sx={{ fontWeight: 900, color: "#1a1a1a", letterSpacing: "-1px" }}>
              Carrusel
            </Typography>
          </Box>
          <Typography variant="body1" sx={{ color: "text.secondary", fontWeight: 500, maxWidth: 860 }}>
            Panel de administracion para cargar imagenes, cambiar el orden y revisar las piezas disponibles en el carrusel que se muestran como publicidad en la aplicación.
          </Typography>
        </Box>

        <Paper
          elevation={0}
          sx={{
            p: 3,
            borderRadius: 4,
            border: "1px solid rgba(15, 23, 42, 0.08)",
            backgroundColor: "#ffffff",
          }}
        >
          <Stack direction="row" spacing={1.25} alignItems="center" sx={{ mb: 1 }}>
            <TuneIcon sx={{ color: "#CC0000" }} />
            <Typography variant="h6" sx={{ fontWeight: 800 }}>
              Imagenes del carrusel
            </Typography>
          </Stack>
          <ResumenTarjetas resumen={resumen} tarjetasResumen={tarjetasResumen} />

          {/* ...otros bloques de UI... */}

          {mensaje ? (
            <Alert severity="success" sx={{ mb: 3, borderRadius: 2 }} onClose={() => setMensaje("")}>
              {mensaje}
            </Alert>
          ) : null}

          {error ? (
            <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }} onClose={() => setError("")}>
              {error}
            </Alert>
          ) : null}

          <Box
            sx={{
              mb: 3,
              px: 2,
              py: 1.5,
              borderRadius: 3,
              border: "1px solid rgba(15, 23, 42, 0.08)",
              background: "linear-gradient(180deg, #ffffff 0%, #fafafa 100%)",
            }}
          >
            <Stack
              direction={{ xs: "column", xl: "row" }}
              spacing={{ xs: 1.5, xl: 2 }}
              alignItems={{ xs: "flex-start", xl: "center" }}
              justifyContent="space-between"
            >
              <Stack direction="row" spacing={1.25} alignItems="center" flexWrap="wrap" sx={{ rowGap: 1 }}>
                <Button
                  size="small"
                  variant="contained"
                  startIcon={<CloudUploadIcon />}
                  onClick={() => setOpenModal(true)}
                  sx={{ minWidth: "auto", px: 1.5 }}
                >
                  Agregar imagen
                </Button>
              </Stack>

              <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap" sx={{ rowGap: 1 }}>
                <Typography variant="body2" sx={{ fontWeight: 800, color: "#111827" }}>
                  Orden actual
                </Typography>
                <Typography variant="caption" sx={{ color: "text.secondary" }}>
                  La primera imagen aparece primero.
                </Typography>
                <Chip size="small" label="Agregar" icon={<CloudUploadIcon />} />
                <Chip size="small" label="Ordenar" icon={<ArrowUpwardIcon />} />
                <Chip size="small" label="Eliminar" icon={<DeleteOutlineIcon />} />
              </Stack>

              <Stack direction="row" spacing={1.25} alignItems="center" sx={{ minWidth: { xs: "100%", xl: 260 } }}>
                <Typography variant="body2" sx={{ fontWeight: 800, color: "#111827", whiteSpace: "nowrap" }}>
                  Uso estimado
                </Typography>
                <Box sx={{ flexGrow: 1 }}>
                  <LinearProgress
                    variant="determinate"
                    value={Math.min((resumen.total / 12) * 100, 100)}
                    sx={{ height: 8, borderRadius: 10, backgroundColor: "rgba(204,0,0,0.10)", "& .MuiLinearProgress-bar": { borderRadius: 10 } }}
                  />
                </Box>
                <Typography variant="caption" sx={{ color: "text.secondary", whiteSpace: "nowrap" }}>
                  {resumen.total} de 12
                </Typography>
              </Stack>
            </Stack>
          </Box>

          <ListaImagenes
            imagenes={imagenes}
            imagenActiva={imagenActiva}
            moverImagen={moverImagen}
            eliminarImagen={eliminarImagen}
            setPreviewImagen={setPreviewImagen}
            setOpenPreview={setOpenPreview}
          />
        </Paper>
      </Box>

      <ModalPreview open={openPreview} onClose={() => setOpenPreview(false)} previewImagen={previewImagen} />

      <ModalUpload
        open={openModal}
        onClose={() => setOpenModal(false)}
        handleFileChange={handleFileChange}
        modalFile={modalFile}
        modalRedirectUrl={modalRedirectUrl}
        setModalRedirectUrl={setModalRedirectUrl}
        handleModalUpload={handleModalUpload}
        cargandoSubida={cargandoSubida}
      />
    </Layout>
  );
}
