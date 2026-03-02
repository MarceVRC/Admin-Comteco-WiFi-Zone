import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { NavLink } from "react-router-dom";
import comLogoWhite from '../assets/c-white.png'

export default function Header() {
  return (
    <AppBar
      position="fixed"
      elevation={2}
      sx={{
        backgroundColor: "#CC0000",
        paddingX: 2,
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
            <Typography variant="h6" sx={{ lineHeight: 1 }}>
              Comteco Zonas WiFi
            </Typography>
            <Typography variant="subtitle2" sx={{ lineHeight: 1 }}>
              Administración
            </Typography>
          </Box>
        </Box>

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
        </Box>
      </Toolbar>
    </AppBar>
  );
}