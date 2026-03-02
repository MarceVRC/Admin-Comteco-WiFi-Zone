import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Box } from "@mui/material";
import Header from "./components/Header";
import routes from "./routes";

function App() {
  return (
    <Router>
      {/* Contenedor principal */}
      <Box sx={{ minHeight: "100vh", width: "100%", display: "flex", flexDirection: "column" }}>
        
        <Header />

        <Box
          sx={{
            flexGrow: 1,
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "stretch",
            /* center content and limit max width for better readability */
            maxWidth: 1200,
            mx: "auto",
            px: 2,
          }}
        >
          <Routes>
            <Route path="/" element={<Navigate to="/estadisticas" replace />} />
            {routes.map((r) => (
              <Route
                key={r.path}
                path={r.path}
                element={<r.component />}
              />
            ))}
          </Routes>
        </Box>

      </Box>
    </Router>
  );
}

export default App;