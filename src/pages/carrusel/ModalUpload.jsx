import React from "react";
import { Modal, Box, Typography, TextField, Button, CircularProgress } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

export default function ModalUpload({ open, onClose, handleFileChange, modalFile, modalRedirectUrl, setModalRedirectUrl, handleModalUpload, cargandoSubida }) {
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        borderRadius: 3,
        minWidth: 320,
        maxWidth: 380,
        display: 'flex',
        flexDirection: 'column',
        gap: 2
      }}>
        <Typography variant="h6" sx={{ fontWeight: 800, mb: 1 }}>Agregar imagen al carrusel</Typography>
        <TextField
          type="file"
          inputProps={{ accept: 'image/*' }}
          onChange={handleFileChange}
          fullWidth
        />
        <TextField
          size="small"
          label="URL de redireccion"
          placeholder="Opcional – https://comteco.com.bo"
          value={modalRedirectUrl}
          onChange={(e) => setModalRedirectUrl(e.target.value)}
          fullWidth
        />
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
          <Button onClick={onClose} color="secondary">Cancelar</Button>
          <Button
            variant="contained"
            onClick={handleModalUpload}
            disabled={cargandoSubida || !modalFile}
            startIcon={cargandoSubida ? <CircularProgress size={14} color="inherit" /> : <CloudUploadIcon />}
          >
            {cargandoSubida ? 'Subiendo...' : 'Subir'}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
