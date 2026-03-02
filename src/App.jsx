import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Estadisticas from "./pages/Estadisticas.jsx";
import Zonas from "./pages/Zonas.jsx";
import Reportes from "./pages/Reportes.jsx";
import Box from "@mui/material/Box";

function App() {
  return (
    <Router>
      <Header />
      <Box sx={{ marginTop: "90px", padding: "20px" }}>
        <Routes>
          {/* Ruta principal: redirige a /estadisticas */}
          <Route path="/" element={<Navigate to="/estadisticas" replace />} />
          
          <Route path="/estadisticas" element={<Estadisticas />} />
          <Route path="/zonas" element={<Zonas />} />
          <Route path="/reportes" element={<Reportes />} />
        </Routes>
      </Box>
    </Router>
  );
}

export default App;