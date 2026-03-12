import React, { useState } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Paper,
  TableContainer,
  Box,
  Chip,
  Tooltip,
} from "@mui/material";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import DangerousIcon from "@mui/icons-material/Dangerous";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ModalDetalleReporte from "./ModalDetalleReporte";

// Devuelve configuración visual según nivel de gravedad (1-5)
const getSeverityConfig = (nivel) => {
  if (nivel >= 5) return {
    color: "#d32f2f",
    bg: "#ffebee",
    label: "Crítico",
    icon: <DangerousIcon sx={{ fontSize: 16 }} />,
  };
  if (nivel >= 3) return {
    color: "#e65100",
    bg: "#fff3e0",
    label: "Moderado",
    icon: <WarningAmberIcon sx={{ fontSize: 16 }} />,
  };
  return {
    color: "#2e7d32",
    bg: "#e8f5e9",
    label: "Leve",
    icon: <CheckCircleOutlineIcon sx={{ fontSize: 16 }} />,
  };
};

const SeveridadChip = ({ nivel }) => {
  const { color, bg, label, icon } = getSeverityConfig(nivel);
  return (
    <Tooltip title={`Gravedad ${nivel}/5`} arrow>
      <Box sx={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 0.6,
        width: 110,
        py: 0.4,
        borderRadius: 0,
        backgroundColor: bg,
        color,
        fontWeight: 700,
        fontSize: "0.75rem",
        border: `1px solid ${color}33`,
        whiteSpace: "nowrap",
      }}>
        {icon}
        {label}
        <Box component="span" sx={{
          ml: 0.5,
          width: 18,
          height: 18,
          borderRadius: "50%",
          backgroundColor: color,
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "0.65rem",
          fontWeight: 800,
        }}>
          {nivel}
        </Box>
      </Box>
    </Tooltip>
  );
};

export default function TablaReportes({ reportes }) {
  const [modalAbierto, setModalAbierto] = useState(false);
  const [reporteSeleccionado, setReporteSeleccionado] = useState(null);

  const handleAbrirDetalles = (reporte) => {
    setReporteSeleccionado(reporte);
    setModalAbierto(true);
  };

  const handleCerrarDetalles = () => {
    setModalAbierto(false);
    setReporteSeleccionado(null);
  };

  return (
    <>
      <TableContainer
        component={Paper}
        elevation={2}
        sx={{
          borderRadius: 0,
          width: "100%",
        }}
      >
        <Table sx={{ minWidth: 800 }}>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#CC0000" }}>
              {["Fecha", "Hora", "ID", "Zona Wi-Fi", "Título", "Gravedad", "Detalles"].map((col, i) => (
                <TableCell
                  key={i}
                  sx={{
                    color: "white",
                    fontWeight: "bold",
                  }}
                >
                  {col}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {reportes.map((rep, index) => (
              <TableRow
                key={index}
                sx={{
                  backgroundColor: index % 2 === 0 ? "#f2f6fc" : "white",
                  "&:hover": { backgroundColor: "#e3f2fd" },
                }}
              >
                <TableCell>{rep.fecha}</TableCell>
                <TableCell>{rep.hora}</TableCell>
                <TableCell>{rep.idDisplay}</TableCell>
                <TableCell>{rep.zona}</TableCell>
                <TableCell>{rep.titulo}</TableCell>
                <TableCell>
                  <SeveridadChip nivel={rep.gravedad} />
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => handleAbrirDetalles(rep)}
                    sx={{
                      backgroundColor: "#d32f2f",
                      textTransform: "none",
                      "&:hover": { backgroundColor: "#CC0000" },
                    }}
                  >
                    Ver
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <ModalDetalleReporte
        open={modalAbierto}
        onClose={handleCerrarDetalles}
        reporte={reporteSeleccionado}
      />
    </>
  );
}
