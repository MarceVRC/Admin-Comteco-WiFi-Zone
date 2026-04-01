import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Box, Container } from "@mui/material";
import Header from "./components/common/Header";
import Estadisticas from "./pages/Estadisticas";
import Zonas from "./pages/Zonas";
import Reportes from "./pages/Reportes";
import Login from "./pages/Login";
import Register from "./pages/Register";

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

        <Container
          maxWidth={false}
          sx={{
            flexGrow: 1,
            width: "100%",
            maxWidth: "1600px !important", // Limitar ancho en pantallas ultra-wide
            display: "flex",
            flexDirection: "column",
            pt: { xs: 10, md: 12 }, // Padding superior para el header fijo
            pb: 4,
            px: { xs: 2, md: 3 }
          }}
        >
          <Routes>
            <Route path="/" element={<Navigate to="/estadisticas" replace />} />
            <Route path="/login" element={<Login />} />

            <Route path="/estadisticas" element={<ProtectedRoute><Estadisticas /></ProtectedRoute>} />
            <Route path="/zonas" element={<ProtectedRoute><Zonas /></ProtectedRoute>} />
            <Route path="/reportes" element={<ProtectedRoute><Reportes /></ProtectedRoute>} />
            <Route path="/register" element={<ProtectedRoute><Register /></ProtectedRoute>} />

            <Route path="*" element={<Navigate to="/estadisticas" replace />} />
          </Routes>
        </Container>

      </Box>
    </Router>
  );
}

export default App;