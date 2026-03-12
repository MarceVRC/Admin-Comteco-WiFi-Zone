import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import comLogoWhite from '../../assets/c-white.png';
import LogoutIcon from '@mui/icons-material/Logout';

/**
 * Componente de cabecera con navegación.
 */
export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const hideHeader = location.pathname === "/login";

  if (hideHeader) return null;

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <AppBar
      position="fixed"
      elevation={0} // Eliminar sombra para un look más flat
      sx={{
        backgroundColor: "#CC0000",
        paddingX: 2,
        borderRadius: 0, // Asegurar que no tenga curvas
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box
            component="img"
            src={comLogoWhite}
            alt="Logo Comteco"
            sx={{
              height: 45,
              width: "auto",
              marginRight: 2,
            }}
          />
          <Box>
            <Typography variant="h6" sx={{ lineHeight: 1, fontWeight: "bold" }}>
              Comteco Zonas WiFi
            </Typography>
            <Typography variant="subtitle2" sx={{ lineHeight: 1 }}>
              Administración
            </Typography>
          </Box>
        </Box>

        {token && (
          <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
            <Button
              component={NavLink}
              to="/estadisticas"
              color="inherit"
              size="small"
              sx={{
                textTransform: "none",
                "&.active": { borderBottom: "2px solid #fff" },
              }}
            >
              Estadísticas
            </Button>
            <Button
              component={NavLink}
              to="/zonas"
              color="inherit"
              size="small"
              sx={{
                textTransform: "none",
                "&.active": { borderBottom: "2px solid #fff" },
              }}
            >
              Zonas
            </Button>
            <Button
              component={NavLink}
              to="/reportes"
              color="inherit"
              size="small"
              sx={{
                textTransform: "none",
                "&.active": { borderBottom: "2px solid #fff" },
              }}
            >
              Reportes
            </Button>
            
            <Button
              onClick={handleLogout}
              color="inherit"
              size="small"
              startIcon={<LogoutIcon />}
              sx={{
                textTransform: "none",
                ml: 2,
                border: "1px solid rgba(255,255,255,0.5)",
                "&:hover": { bgcolor: "rgba(255,255,255,0.1)" }
              }}
            >
              Salir
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}
