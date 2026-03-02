import React from "react";
import { Box, Toolbar } from "@mui/material";

export default function Layout({ children }) {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        backgroundColor: "#f5f5f5",
        p: { xs: 2, sm: 3, md: 4 },
      }}
    >
      {/* toolbar spacer ensures content sits below fixed header */}
      <Toolbar />
      {children}
    </Box>
  );
}
