export async function fetchDashboardData() {
    try {
      const res = await fetch("/data.json");
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      const data = await res.json();
      console.log("Fetched data:", data); // Debugging
      return data;
      
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  }
  