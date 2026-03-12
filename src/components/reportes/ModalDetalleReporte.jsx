import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
    Box,
    Chip,
    Divider,
    IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SignalWifiStatusbarConnectedNoInternet4Icon from '@mui/icons-material/SignalWifiStatusbarConnectedNoInternet4';
import FeedbackIcon from '@mui/icons-material/Feedback';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const getSeverityColor = (severity) => {
    if (severity >= 5) return "#d32f2f"; // Rojo intenso
    if (severity >= 3) return "#f57c00"; // Naranja
    return "#388e3c"; // Verde
};

const getTipoLabel = (tipo) => {
    const tipos = {
        'BAJA_COBERTURA': 'Baja Cobertura',
        'SIN_CONEXION': 'Sin Conexión',
        'LENTITUD': 'Intermitencia / Lentitud',
        'OTROS': 'Otros'
    };
    return tipos[tipo] || tipo;
};

export default function ModalDetalleReporte({ open, onClose, reporte }) {
    if (!reporte) return null;

    const severityColor = getSeverityColor(reporte.gravedad);

    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="sm"
            PaperProps={{
                sx: {
                    borderRadius: 0,
                    overflow: 'hidden',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.15)'
                }
            }}
        >
            <Box sx={{
                background: `linear-gradient(135deg, ${severityColor} 0%, #CC0000 100%)`,
                p: 2,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                color: 'white'
            }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    Detalles del Reporte {reporte.idDisplay}
                </Typography>
                <IconButton onClick={onClose} size="small" sx={{ color: 'white' }}>
                    <CloseIcon />
                </IconButton>
            </Box>

            <DialogContent sx={{ p: 4 }}>
                <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <FeedbackIcon color="action" />
                    <Typography variant="h5" sx={{ fontWeight: '800', color: '#333' }}>
                        {reporte.titulo}
                    </Typography>
                </Box>

                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
                    <Chip
                        label={getTipoLabel(reporte.tipo)}
                        color="error"
                        variant="outlined"
                        sx={{ fontWeight: 'bold', borderRadius: 0 }}
                    />
                    <Chip
                        label={`Gravedad: ${reporte.gravedad}`}
                        sx={{
                            backgroundColor: severityColor,
                            color: 'white',
                            fontWeight: 'bold',
                            borderRadius: 0
                        }}
                    />
                </Box>

                <Divider sx={{ mb: 3 }} />

                <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 3 }}>
                    <Box>
                        <Typography variant="caption" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.5 }}>
                            <LocationOnIcon fontSize="inherit" /> ZONA WI-FI
                        </Typography>
                        <Typography variant="body1" sx={{ fontWeight: '600' }}>
                            {reporte.zona}
                        </Typography>
                    </Box>
                    <Box>
                        <Typography variant="caption" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.5 }}>
                            <SignalWifiStatusbarConnectedNoInternet4Icon fontSize="inherit" /> ID DE ZONA
                        </Typography>
                        <Typography variant="body1" sx={{ fontWeight: '600' }}>
                            {reporte.zona_id}
                        </Typography>
                    </Box>
                    <Box>
                        <Typography variant="caption" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.5 }}>
                            <CalendarTodayIcon fontSize="inherit" /> FECHA
                        </Typography>
                        <Typography variant="body1" sx={{ fontWeight: '600' }}>
                            {reporte.fecha}
                        </Typography>
                    </Box>
                    <Box>
                        <Typography variant="caption" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.5 }}>
                            <AccessTimeIcon fontSize="inherit" /> HORA
                        </Typography>
                        <Typography variant="body1" sx={{ fontWeight: '600' }}>
                            {reporte.hora}
                        </Typography>
                    </Box>
                </Box>

                <Box sx={{ mt: 4, p: 2, bgcolor: '#f8f9fa', borderRadius: 0, borderLeft: `4px solid ${severityColor}` }}>
                    <Typography variant="caption" color="text.secondary">DESCRIPCIÓN</Typography>
                    <Typography variant="body1" sx={{ mt: 1, color: '#444', lineHeight: 1.6 }}>
                        "{reporte.descripcion}"
                    </Typography>
                </Box>
            </DialogContent>

            <DialogActions sx={{ p: 3, bgcolor: '#f4f4f4' }}>
                <Button
                    onClick={onClose}
                    variant="contained"
                    sx={{
                        px: 4,
                        borderRadius: 0,
                        bgcolor: '#333',
                        '&:hover': { bgcolor: '#000' }
                    }}
                >
                    Cerrar
                </Button>
            </DialogActions>
        </Dialog>
    );
}
