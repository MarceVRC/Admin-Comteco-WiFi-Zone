import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Box } from "@mui/material";
import Header from "./components/Header";
import Estadisticas from "./pages/Estadisticas";
import Zonas from "./pages/Zonas";
import Reportes from "./pages/Reportes";

function App() {
  return (
    <Router>
      <Box sx={{ minHeight: "100vh", width: "100%" }}>
        
        <Header />
        <Box
          sx={{
            width: "100%",
            marginTop: "90px",
          }}
        >
          <Routes>
            <Route path="/" element={<Navigate to="/estadisticas" replace />} />
            <Route path="/estadisticas" element={<Estadisticas />} />
            <Route path="/zonas" element={<Zonas />} />
            <Route path="/reportes" element={<Reportes />} />
          </Routes>
        </Box>

      </Box>
    </Router>
  );
}

export default App;