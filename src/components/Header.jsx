import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
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

        <IconButton
          size="large"
          edge="end"
          color="inherit"
          aria-label="menu"
          sx={{ ml: 2 }}
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}