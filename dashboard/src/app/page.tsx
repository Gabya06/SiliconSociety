"use client";

import { useEffect, useState } from "react";
import { Box, Grid, Typography, Paper } from "@mui/material";
import SummaryStats from "@/components/SummaryStats";
import TopCategories from "@/components/TopCategories";
import SalesLineChart from "@/components/SalesLineChart";
import DashboardHeader from "@/components/DashboardHeader";
import { fetchDashboardData } from "@/utils/fetchData";

export default function Home() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  useEffect(() => {
    async function loadData() {
      try {
        const fetchedData = await fetchDashboardData();
        console.log("Fetched Data:", fetchedData); //  For Debugging

        if (fetchedData && Array.isArray(fetchedData.data)) {
          setData(fetchedData);
        } else {
          console.error("Unexpected data structure:", fetchedData);
          setError("Invalid data format");
        }
      } catch (err) {
        console.error("Error loading data:", err);
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!data) return <p>No data available</p>;

  // Calculate totals from the data array
  const { data: dataEntries } = data;
  const totalSales = dataEntries.reduce((acc, entry) => acc + entry.totalSales, 0);
  const orderCount = dataEntries.reduce((acc, entry) => acc + entry.orderCount, 0);
  const averageOrderValue = totalSales / orderCount || 0;  // Calculate average
  const newCustomers = dataEntries.reduce((acc, entry) => acc + entry.newCustomers, 0);

  return (    
    <Box sx={{ padding: "20px" }}>
      {/* Dashboard Header */}
      <DashboardHeader company={data.company} timeframe={data.timeframe} />
      {/* Summary Stats */}
      <SummaryStats
        totalSales={totalSales || 0}
        orderCount={orderCount || 0}
        averageOrderValue={averageOrderValue || 0}
        newCustomers={newCustomers || 0}
      />
      <Box sx={{ marginBottom: "24px" }} />
      {/* Sales Line Chart */}
      <SalesLineChart data={dataEntries} />
    </Box>
    
  );
}
