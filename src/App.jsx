import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Box } from "@mui/material";
import Header from "./components/common/Header";
import Estadisticas from "./pages/Estadisticas";
import Zonas from "./pages/Zonas";
import Reportes from "./pages/Reportes";
import Login from "./pages/Login";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  return (
    <Router>
      <Box sx={{ minHeight: "100vh", width: "100%", display: "flex", flexDirection: "column" }}>

        <Header />

        <Box
          sx={{
            flexGrow: 1,
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "stretch",
            maxWidth: 1200,
            mx: "auto",
            px: 2,
            mt: 10 // Espacio para el header fixed
          }}
        >
          <Routes>
            <Route path="/" element={<Navigate to="/estadisticas" replace />} />
            
            {/* Rutas Públicas */}
            <Route path="/login" element={<Login />} />

            {/* Rutas Protegidas */}
            <Route path="/estadisticas" element={<ProtectedRoute><Estadisticas /></ProtectedRoute>} />
            <Route path="/zonas" element={<ProtectedRoute><Zonas /></ProtectedRoute>} />
            <Route path="/reportes" element={<ProtectedRoute><Reportes /></ProtectedRoute>} />
            
            {/* Catch all */}
            <Route path="*" element={<Navigate to="/estadisticas" replace />} />
          </Routes>
        </Box>

      </Box>
    </Router>
  );
}

export default App;