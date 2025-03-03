"use client";

import { useEffect, useState } from "react";
import { Box, Grid, Typography, Paper } from "@mui/material";
import SortableTable from "@/components/SortableTable";
import DashboardHeader from "@/components/DashboardHeader";


type DataEntry = {
  date: string;
  totalSales: number;
  orderCount: number;
  averageOrderValue: number;
  topCategory: string;
  customerSatisfaction: number;
  newCustomers: number;
  returnRate: number;
};

type DashboardData = {
  company: string;
  timeframe: string;
  data: DataEntry[];
};

export default function Details() {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [sortField, setSortField] = useState<keyof DataEntry>("date");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((json: DashboardData) => setDashboardData(json))
      .catch((err) => console.error("Error loading data:", err));
  }, []);

  if (!dashboardData) return <p>Loading...</p>;

  return (
    <Box sx={{ padding: "20px" }}>
      {/* Dashboard Header */}
      <DashboardHeader company={dashboardData.company} timeframe={dashboardData.timeframe} />

      <Box sx={{ marginBottom: "24px" }} />

        <div style={{ padding: "20px" }}>
          <Typography variant="h4" sx={{ marginBottom: "16px" }}>
            Data Details
          </Typography>
          <SortableTable data={dashboardData.data} />
        </div>
        </Box>     
  );
}
