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
  Tooltip,
  Typography,
  Card,
  CardContent,
  useMediaQuery,
  useTheme
} from "@mui/material";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import DangerousIcon from "@mui/icons-material/Dangerous";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ModalDetalleReporte from "./ModalDetalleReporte";

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
        width: 100,
        py: 0.4,
        borderRadius: 1,
        backgroundColor: bg,
        color,
        fontWeight: 700,
        fontSize: "0.7rem",
        border: `1px solid ${color}33`,
      }}>
        {icon} {label}
      </Box>
    </Tooltip>
  );
};

export default function TablaReportes({ reportes }) {
  const [modalAbierto, setModalAbierto] = useState(false);
  const [reporteSeleccionado, setReporteSeleccionado] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleAbrirDetalles = (reporte) => {
    setReporteSeleccionado(reporte);
    setModalAbierto(true);
  };

  const CardMobile = ({ rep }) => (
    <Card sx={{ mb: 2, borderRadius: 2, borderLeft: `6px solid ${getSeverityColor(rep.gravedad)}` }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="caption" color="textSecondary">{rep.fecha} - {rep.hora}</Typography>
          <SeveridadChip nivel={rep.gravedad} />
        </Box>
        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>{rep.titulo}</Typography>
        <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>Zona: {rep.zona}</Typography>
        <Button 
          variant="contained" 
          fullWidth 
          onClick={() => handleAbrirDetalles(rep)}
          sx={{ bgcolor: '#CC0000', '&:hover': { bgcolor: '#990000' } }}
        >
          Ver Detalles
        </Button>
      </CardContent>
    </Card>
  );

  const getSeverityColor = (nivel) => getSeverityConfig(nivel).color;

  return (
    <>
      {isMobile ? (
        <Box>
            {reportes.length === 0 && <Typography align="center" sx={{ py: 4 }}>No hay reportes que coincidan.</Typography>}
            {reportes.map((rep, i) => <CardMobile key={i} rep={rep} />)}
        </Box>
      ) : (
        <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid #eee' }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {["Fecha", "ID", "Zona WiFi", "Título", "Gravedad", "Acción"].map((col) => (
                  <TableCell key={col} sx={{ backgroundColor: "#CC0000", color: "white", fontWeight: "bold" }}>
                    {col}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {reportes.map((rep, index) => (
                <TableRow key={index} hover>
                  <TableCell>
                    <Typography variant="body2">{rep.fecha}</Typography>
                    <Typography variant="caption" color="textSecondary">{rep.hora}</Typography>
                  </TableCell>
                  <TableCell>{rep.idDisplay}</TableCell>
                  <TableCell sx={{ fontWeight: 500 }}>{rep.zona}</TableCell>
                  <TableCell>{rep.titulo}</TableCell>
                  <TableCell><SeveridadChip nivel={rep.gravedad} /></TableCell>
                  <TableCell>
                    <Button variant="outlined" size="small" onClick={() => handleAbrirDetalles(rep)} sx={{ color: '#CC0000', borderColor: '#CC0000' }}>
                      Ver
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <ModalDetalleReporte
        open={modalAbierto}
        onClose={() => setModalAbierto(false)}
        reporte={reporteSeleccionado}
      />
    </>
  );
}
