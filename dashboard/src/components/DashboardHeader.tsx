import { Box, Typography } from "@mui/material";

interface DashboardHeaderProps {
  company: string;
  timeframe: string;
}

export default function DashboardHeader({ company, timeframe }: DashboardHeaderProps) {
  return (
    <Box sx={{ marginBottom: "24px", textAlign: "center" }}>
      <Typography variant="h4" color="#020c69" sx={{ fontWeight: "bold"}}>
        {company} Dashboard
      </Typography>
      <Typography variant="subtitle1" color="textSecondary">
        {timeframe}
      </Typography>
    </Box>
  );
}
