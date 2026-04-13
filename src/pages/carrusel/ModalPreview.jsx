import React from "react";
import { Modal, Box, Typography, Button } from "@mui/material";

export default function ModalPreview({ open, onClose, previewImagen }) {
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 3,
        borderRadius: 3,
        maxWidth: '90vw',
        maxHeight: '90vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
        overflow: 'auto',
      }}>
        {previewImagen && (
          <>
            <Typography variant="h6" sx={{ fontWeight: 800 }}>{previewImagen.nombre}</Typography>
            <Box
              component="img"
              src={previewImagen.url}
              alt={previewImagen.nombre}
              sx={{ maxWidth: '100%', maxHeight: '60vh', objectFit: 'contain', borderRadius: 2 }}
            />
            {previewImagen.redirectUrl ? (
              <Typography variant="body2" sx={{ color: 'text.secondary', wordBreak: 'break-all' }}>
                Redirige a: {previewImagen.redirectUrl}
              </Typography>
            ) : null}
            <Button variant="outlined" onClick={onClose}>Cerrar</Button>
          </>
        )}
      </Box>
    </Modal>
  );
}
