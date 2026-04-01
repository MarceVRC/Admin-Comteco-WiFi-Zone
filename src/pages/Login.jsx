import React, { useState } from "react";
import {
    Box,
    Button,
    TextField,
    Typography,
    Paper,
    Container,
    Alert,
    InputAdornment,
    IconButton
} from "@mui/material";
import { Visibility, VisibilityOff, Email, Lock } from "@mui/icons-material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/authApi";
import { isAuthenticated, saveAuthToken } from "../utils/auth";
import comLogoRed from "../assets/c-red.png";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated()) {
            navigate("/estadisticas", { replace: true });
        }
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!email || !password) {
            setError("Ingrese sus credenciales.");
            return;
        }

        setLoading(true);
        try {
            const data = await login(email, password);
            if (data.token) {
                saveAuthToken(data.token);
                navigate("/estadisticas");
            } else {
                setError("Error de autenticación.");
            }
        } catch (err) {
            setError(err.message || "Credenciales incorrectas.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="xs" sx={{ mt: 15, mb: 10 }}>
            <Paper elevation={6} sx={{ p: 4, display: "flex", flexDirection: "column", alignItems: "center" }}>
                <Box
                    component="img"
                    src={comLogoRed}
                    alt="Logo"
                    sx={{ height: 80, mb: 2 }}
                />
                <Typography component="h1" variant="h5" sx={{ fontWeight: "bold", color: "#CC0000" }}>
                    COMTECO ZONAS WiFi
                </Typography>
                <Typography variant="subtitle1" sx={{ mb: 3, color: "text.secondary" }}>
                    Administración
                </Typography>

                {error && <Alert severity="error" sx={{ width: "100%", mb: 2 }}>{error}</Alert>}

                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: "100%" }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Correo Electrónico"
                        autoFocus
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        InputProps={{
                            startAdornment: <InputAdornment position="start"><Email sx={{ color: "#CC0000" }} /></InputAdornment>
                        }}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Contraseña"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        InputProps={{
                            startAdornment: <InputAdornment position="start"><Lock sx={{ color: "#CC0000" }} /></InputAdornment>,
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        disabled={loading}
                        sx={{ mt: 3, mb: 2, py: 1.5, fontWeight: "bold" }}
                    >
                        {loading ? "Cargando..." : "Iniciar Sesión"}
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
};

export default Login;
