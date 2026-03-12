import React, { useState } from "react";
import { 
    Box, 
    Button, 
    TextField, 
    Typography, 
    Paper, 
    Container, 
    Alert,
    InputAdornment
} from "@mui/material";
import { Person, Email, Lock, Phone } from "@mui/icons-material";
import { register } from "../api/authApi";
import comLogoRed from "../assets/c-red.png";

const Register = () => {
    const [formData, setFormData] = useState({
        nombre: "",
        email: "",
        password: "",
        telefono: ""
    });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (!formData.nombre || !formData.email || !formData.password) {
            setError("Los campos nombre, email y contraseña son obligatorios.");
            return;
        }

        setLoading(true);
        try {
            await register(formData.nombre, formData.email, formData.password, formData.telefono);
            setSuccess("Administrador registrado con éxito.");
            setFormData({ nombre: "", email: "", password: "", telefono: "" });
        } catch (err) {
            setError(err.message || "Error al registrar");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="xs" sx={{ mt: 8, mb: 4 }}>
            <Paper elevation={3} sx={{ p: 4, display: "flex", flexDirection: "column", alignItems: "center" }}>
                <Box component="img" src={comLogoRed} alt="Logo" sx={{ height: 60, mb: 2 }} />
                
                <Typography component="h1" variant="h5" sx={{ fontWeight: "bold", color: "#CC0000", mb: 3 }}>
                    Nuevo Administrador
                </Typography>

                {error && <Alert severity="error" sx={{ width: "100%", mb: 2 }}>{error}</Alert>}
                {success && <Alert severity="success" sx={{ width: "100%", mb: 2 }}>{success}</Alert>}

                <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%" }}>
                    <TextField
                        margin="normal"
                        fullWidth
                        name="nombre"
                        label="Nombre Completo"
                        value={formData.nombre}
                        onChange={handleChange}
                        InputProps={{
                            startAdornment: <InputAdornment position="start"><Person sx={{ color: "#CC0000" }} /></InputAdornment>
                        }}
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        name="email"
                        label="Correo Electrónico"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        InputProps={{
                            startAdornment: <InputAdornment position="start"><Email sx={{ color: "#CC0000" }} /></InputAdornment>
                        }}
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        name="telefono"
                        label="Teléfono (Opcional)"
                        value={formData.telefono}
                        onChange={handleChange}
                        InputProps={{
                            startAdornment: <InputAdornment position="start"><Phone sx={{ color: "#CC0000" }} /></InputAdornment>
                        }}
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        name="password"
                        label="Contraseña"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        InputProps={{
                            startAdornment: <InputAdornment position="start"><Lock sx={{ color: "#CC0000" }} /></InputAdornment>
                        }}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        disabled={loading}
                        sx={{ mt: 3, mb: 2, py: 1.5, fontWeight: "bold" }}
                    >
                        {loading ? "Registrando..." : "Crear Usuario"}
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
};

export default Register;
