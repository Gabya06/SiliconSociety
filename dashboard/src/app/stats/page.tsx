"use client";

import { useEffect, useState } from "react";
import { Box, Grid, Paper, Typography } from "@mui/material";
import DashboardHeader from "@/components/DashboardHeader";
import TopCategories from "@/components/TopCategories";
import { fetchDashboardData } from "@/utils/fetchData";

export default function StatsPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadData() {
      try {
        const fetchedData = await fetchDashboardData();
        console.log("Fetched Data:", fetchedData); // ✅ Debugging

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

  const { data: dataEntries } = data;

  // Count occurrences of each top category
  const categoryCounts = dataEntries.reduce((acc, entry) => {
    acc[entry.topCategory] = (acc[entry.topCategory] || 0) + 1;
    return acc;
  }, {});

  // Calculate average customer satisfaction by category
  const categorySatisfaction = dataEntries.reduce((acc, entry) => {
    acc[entry.topCategory] = acc[entry.topCategory] || { total: 0, count: 0 };
    acc[entry.topCategory].total += entry.customerSatisfaction;
    acc[entry.topCategory].count += 1;
    return acc;
  }, {});

  const topCategories = Object.entries(categoryCounts)
    .map(([category, count]) => ({
      category,
      count,
      avgSatisfaction: (categorySatisfaction[category].total / categorySatisfaction[category].count).toFixed(2),
    }))
    .sort((a, b) => b.count - a.count);

  return (
    <Box sx={{ padding: "20px" }}>
      {/* Dashboard Header */}
      <DashboardHeader company={data.company} timeframe={data.timeframe} />

      <Box sx={{ marginBottom: "24px" }} />

      {/* Top Categories & Customer Satisfaction */}
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Paper sx={{ padding: "16px" }}>
            <TopCategories categories={topCategories} />
          </Paper>
        </Grid>

        <Grid item xs={6}>
          <Paper sx={{ padding: "16px" }}>
            <Typography variant="h6" color="#002f9e" gutterBottom>
              Avgerage Customer Satisfaction by Category
            </Typography>
            <ul>
              {topCategories.map(({ category, avgSatisfaction }) => (
                <li key={category}>
                  <strong>{category}:</strong> {avgSatisfaction}
                </li>
              ))}
            </ul>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
