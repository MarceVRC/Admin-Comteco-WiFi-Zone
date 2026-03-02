import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Paper,
  TableContainer,
} from "@mui/material";

export default function TablaReportes({ reportes }) {
  return (
    <TableContainer
      component={Paper}
      elevation={2}
      sx={{
        borderRadius: 3,
        width: "100%",
      }}
    >
      <Table sx={{ minWidth: 750 }}>
        <TableHead>
          <TableRow sx={{ backgroundColor: "#b71c1c" }}>
            {["Fecha", "Hora", "ID", "Zona Wi-Fi", "Título", "Detalles"].map((col, i) => (
              <TableCell
                key={i}
                sx={{
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                {col}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {reportes.map((rep, index) => (
            <TableRow
              key={index}
              sx={{
                backgroundColor: index % 2 === 0 ? "#f2f6fc" : "white",
                "&:hover": { backgroundColor: "#e3f2fd" },
              }}
            >
              <TableCell>{rep.fecha}</TableCell>
              <TableCell>{rep.hora}</TableCell>
              <TableCell>{rep.id}</TableCell>
              <TableCell>{rep.zona}</TableCell>
              <TableCell>{rep.titulo}</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  size="small"
                  sx={{
                    backgroundColor: "#d32f2f",
                    textTransform: "none",
                    "&:hover": { backgroundColor: "#b71c1c" },
                  }}
                >
                  Ver
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}