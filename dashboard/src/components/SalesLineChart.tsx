import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Box, Typography } from "@mui/material";

type SalesLineChartProps = {
  data: { date: string; totalSales: number }[];
};

export default function SalesLineChart({ data }: SalesLineChartProps) {
  // Format month as "Jan2023"
  const formattedData = data.map((d) => ({
    ...d,
    date: new Date(d.date).toLocaleString("en-US", { month: "short", year: "numeric" }).replace(" ", ""),
  }));

  return (
    <Box sx={{ textAlign: "center", marginTop: "24px" }}>
        {/* Title */}
        <Typography variant="h6" color="#002f9e" gutterBottom>
            Monthly Total Sales
            </Typography>
        {/* Chart */}
        <ResponsiveContainer width="100%" height={300}>        
            <LineChart data={formattedData}>
                <XAxis dataKey="date" />
                <YAxis tickFormatter={(value) => value.toLocaleString()} />
                <Tooltip formatter={(value: number) => `$${value.toLocaleString()}`} />
                <Line type="monotone" dataKey="totalSales" stroke="#333330" strokeWidth={2} />
            </LineChart>
        </ResponsiveContainer>
    </Box>
  );
}
