import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Divider,
  useMediaQuery,
  useTheme,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon
} from "@mui/material";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import comLogoWhite from '../../assets/c-white.png';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import AssessmentIcon from '@mui/icons-material/Assessment';
import MapIcon from '@mui/icons-material/Map';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { clearAuth, isAuthenticated } from '../../utils/auth';

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isLoggedIn = isAuthenticated();

  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const openMenu = Boolean(anchorEl);

  const hideHeader = location.pathname === "/login";
  if (hideHeader) return null;

  const handleOpenMenu = (event) => setAnchorEl(event.currentTarget);
  const handleCloseMenu = () => setAnchorEl(null);
  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const handleLogout = () => {
    handleCloseMenu();
    setMobileOpen(false);
    clearAuth();
    navigate("/login");
  };

  const handleNavigate = (path) => {
    handleCloseMenu();
    setMobileOpen(false);
    navigate(path);
  };

  const navItems = [
    { label: "Estadísticas", path: "/estadisticas", icon: <AssessmentIcon /> },
    { label: "Zonas", path: "/zonas", icon: <MapIcon /> },
    { label: "Reportes", path: "/reportes", icon: <AssignmentIcon /> },
  ];

  const drawer = (
    <Box sx={{ width: 250, pt: 2 }}>
      <Box sx={{ px: 2, mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
        <Box component="img" src={comLogoWhite} sx={{ height: 30, filter: 'brightness(0) saturate(100%) invert(13%) sepia(85%) saturate(7441%) hue-rotate(358deg) brightness(93%) contrast(116%)' }} />
        <Typography variant="h6" sx={{ color: "#CC0000", fontWeight: "bold" }}>Menu</Typography>
      </Box>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem
            button
            key={item.path}
            component={NavLink}
            to={item.path}
            onClick={() => setMobileOpen(false)}
            sx={{
              color: "inherit",
              "&.active": { bgcolor: "rgba(204, 0, 0, 0.08)", color: "#CC0000" }
            }}
          >
            <ListItemIcon sx={{ color: 'inherit' }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        <ListItem button onClick={() => handleNavigate("/register")}>
          <ListItemIcon><PersonAddIcon /></ListItemIcon>
          <ListItemText primary="Nuevo Usuario" />
        </ListItem>
        <ListItem button onClick={handleLogout} sx={{ color: "#CC0000" }}>
          <ListItemIcon><LogoutIcon sx={{ color: "#CC0000" }} /></ListItemIcon>
          <ListItemText primary="Salir" />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <AppBar position="fixed" elevation={0} sx={{ backgroundColor: "#CC0000", zIndex: theme.zIndex.drawer + 1, borderRadius: 0 }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {isMobile && isLoggedIn && (
            <IconButton color="inherit" edge="start" onClick={handleDrawerToggle} sx={{ mr: 1 }}>
              <MenuIcon />
            </IconButton>
          )}
          <Box component="img" src={comLogoWhite} alt="Logo" sx={{ height: { xs: 35, md: 45 }, mr: 2 }} />
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <Typography variant="h6" sx={{ lineHeight: 1, fontWeight: "bold", fontSize: { xs: '1rem', md: '1.25rem' } }}>
              Comteco Zonas WiFi
            </Typography>
            <Typography variant="subtitle2" sx={{ lineHeight: 1, fontSize: '0.75rem' }}>
              Administración
            </Typography>
          </Box>
        </Box>

        {!isMobile && isLoggedIn && (
          <Box sx={{ display: "flex", gap: 1 }}>
            {navItems.map((item) => (
              <Button
                key={item.path}
                component={NavLink}
                to={item.path}
                color="inherit"
                sx={{ borderRadius: 0, "&.active": { borderBottom: "2px solid #fff" } }}
              >
                {item.label}
              </Button>
            ))}
          </Box>
        )}

        {isLoggedIn && (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {!isMobile ? (
              <>
                <IconButton onClick={handleOpenMenu} color="inherit">
                  <AccountCircleIcon fontSize="large" />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={openMenu}
                  onClose={handleCloseMenu}
                  PaperProps={{ sx: { mt: 1, minWidth: 180, borderRadius: 2 } }}
                >
                  <MenuItem onClick={() => handleNavigate("/register")}>
                    <PersonAddIcon sx={{ mr: 1, fontSize: 20 }} /> Nuevo Usuario
                  </MenuItem>
                  <MenuItem onClick={handleLogout} sx={{ color: "#CC0000" }}>
                    <LogoutIcon sx={{ mr: 1, fontSize: 20 }} /> Salir
                  </MenuItem>
                </Menu>
              </>
            ) : null}
          </Box>
        )}
      </Toolbar>

      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 250 },
        }}
      >
        {drawer}
      </Drawer>
    </AppBar>
  );
}
