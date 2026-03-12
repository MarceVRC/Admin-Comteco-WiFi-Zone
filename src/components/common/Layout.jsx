import React from "react";
import { Box } from "@mui/material";

export default function Layout({ children }) {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box component="main" sx={{ width: "100%" }}>
        {children}
      </Box>
    </Box>
  );
}
