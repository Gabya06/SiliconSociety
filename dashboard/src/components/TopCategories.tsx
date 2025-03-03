import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from "@mui/material";

type TopCategoriesProps = {
  categories: { category: string; count: number }[];
};

export default function TopCategories({ categories }: TopCategoriesProps) {
  return (
    <div style={{ marginBottom: "20px" }}>
      <Typography variant="h6" color="#002f9e" sx={{ marginBottom: "10px" }}>Top Performing Categories</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: "#002147" }}>
            <TableRow>
              <TableCell sx={{ color: "white" }}>Category</TableCell>
              <TableCell sx={{ color: "white" }}>Count</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.map((row, index) => (
              <TableRow key={index} sx={index === 0 ? { backgroundColor: "#f0f55f" } : {}}>
                <TableCell>{row.category}</TableCell>
                <TableCell>{row.count}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
