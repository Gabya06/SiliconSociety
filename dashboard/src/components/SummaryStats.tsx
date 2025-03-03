import { Card, CardContent, Typography, Grid } from "@mui/material";

type SummaryStatsProps = {
  totalSales: number;
  orderCount: number;
  averageOrderValue: number;
  newCustomers: number;
};

export default function SummaryStats({
  totalSales,
  orderCount,
  averageOrderValue,
  newCustomers,
}: SummaryStatsProps) {
  const stats = [
    { label: "Total Sales", value: totalSales ? `$${totalSales.toLocaleString()}` : "Loading..." },
    { label: "Total Orders", value: orderCount ? orderCount.toLocaleString() : "Loading..." },
    { label: "Avg Order Value", value: averageOrderValue ? `$${averageOrderValue.toFixed(2)}` : "Loading..." },
    { label: "New Customers", value: newCustomers ? newCustomers.toLocaleString() : "Loading..." },
  ];

  return (
    <Grid container spacing={2} sx={{ marginBottom: "20px" }}>
      {stats.map((stat, index) => (
        <Grid item xs={12} sm={6} md={3} key={index}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="#002f9e">{stat.label}</Typography>
              <Typography variant="h4" color="charcoal">{stat.value}</Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
