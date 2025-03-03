import { useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TableSortLabel } from "@mui/material";

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

type SortableTableProps = {
  data: DataEntry[];
};

export default function SortableTable({ data }: SortableTableProps) {
  const [sortField, setSortField] = useState<keyof DataEntry>("date");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const handleSort = (field: keyof DataEntry) => {
    setSortField(field);
    setSortOrder(sortField === field && sortOrder === "asc" ? "desc" : "asc");
  };

  const sortedData = [...data].sort((a, b) => {
    return sortOrder === "asc"
      ? a[sortField] > b[sortField]
        ? 1
        : -1
      : a[sortField] < b[sortField]
      ? 1
      : -1;
  });
  
  // Number formats for table
  const currencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  });

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: "#002147" }}>
            {Object.keys(data[0]).map((key) => (
              <TableCell key={key} sx={{ color: "white", fontWeight: "bold" }}> 
            
                <TableSortLabel
                  active={sortField === key}
                  direction={sortField === key ? sortOrder : "asc"}
                  onClick={() => handleSort(key as keyof DataEntry)}
                  sx={{
                    color: "white !important",
                    "& .MuiTableSortLabel-icon": { color: "white !important" }, 
                  }}
                >
                  <span style={{ color: "white" }}>{key}</span> 
                </TableSortLabel>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
         {/* Table Body */}
         <TableBody>
          {sortedData.map((entry, index) => (
            <TableRow key={index}>
              {Object.keys(entry).map((key, i) => {
                let value = entry[key as keyof DataEntry];

                // Format totalSales & averageOrderValue as currency
                if (key === "totalSales" || key === "averageOrderValue") {
                  value = currencyFormatter.format(value as number);
                }

                return (
                  <TableCell key={i} sx={{ color: "charcoal" }}> 
                    {value.toString()}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
