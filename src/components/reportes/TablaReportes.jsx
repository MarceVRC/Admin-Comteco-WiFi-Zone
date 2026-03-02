import { Table, TableHead, TableRow, TableCell, TableBody, Button } from "@mui/material";

export default function TablaReportes({ reportes }) {
  return (
    <Table>
      <TableHead>
        <TableRow sx={{ backgroundColor: "#b71c1c" }}>
          <TableCell sx={{ color: "white", fontWeight: "bold" }}>Fecha</TableCell>
          <TableCell sx={{ color: "white", fontWeight: "bold" }}>Hora</TableCell>
          <TableCell sx={{ color: "white", fontWeight: "bold" }}>ID</TableCell>
          <TableCell sx={{ color: "white", fontWeight: "bold" }}>Zona Wi-Fi</TableCell>
          <TableCell sx={{ color: "white", fontWeight: "bold" }}>Título</TableCell>
          <TableCell sx={{ color: "white", fontWeight: "bold" }}>Detalles</TableCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {reportes.map((rep, index) => (
          <TableRow key={index} sx={{ backgroundColor: index % 2 === 0 ? "#e3f2fd" : "white" }}>
            <TableCell>{rep.fecha}</TableCell>
            <TableCell>{rep.hora}</TableCell>
            <TableCell>{rep.id}</TableCell>
            <TableCell>{rep.zona}</TableCell>
            <TableCell>{rep.titulo}</TableCell>
            <TableCell>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#d32f2f",
                  color: "white",
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
  );
}