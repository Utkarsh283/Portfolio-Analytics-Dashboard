import { Line } from "react-chartjs-2";
import { useEffect, useState } from "react";
import { fetchPortfolioGrowth } from "../api";
import "chart.js/auto";

const PortfolioGrowthChart = () => {
  const [isDarkMode, setIsDarkMode] = useState(
    document.documentElement.classList.contains("dark")
  );
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState("1M"); // Default filter

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDarkMode(document.documentElement.classList.contains("dark"));
    });

    observer.observe(document.documentElement, { attributes: true });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const getPortfolioGrowth = async () => {
      try {
        const growthData = await fetchPortfolioGrowth();
        const filteredData = filterData(growthData, selectedFilter);
        setData({
          labels: filteredData.map((point) => point.date),
          datasets: [
            {
              label: "Portfolio Growth",
              data: filteredData.map((point) => point.value),
              borderColor: "#3b82f6",
              backgroundColor: "rgba(59, 130, 246, 0.2)",
              fill: true,
            },
          ],
        });
      } catch (err) {
        setError("Failed to fetch portfolio growth data.");
      } finally {
        setLoading(false);
      }
    };

    getPortfolioGrowth();
  }, [selectedFilter]);

  const filterData = (data, filter) => {
    const now = new Date();
    const filteredData = data.filter((point) => {
      const pointDate = new Date(point.date);
      if (filter === "1M") {
        return pointDate >= new Date(now.setMonth(now.getMonth() - 1));
      } else if (filter === "3M") {
        return pointDate >= new Date(now.setMonth(now.getMonth() - 3));
      } else if (filter === "1Y") {
        return pointDate >= new Date(now.setFullYear(now.getFullYear() - 1));
      }
      return true;
    });
    return filteredData;
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { labels: { color: "#ffffff" } },
    },
    scales: {
      x: { ticks: { color: "#ffffff" } },
      y: { ticks: { color: "#ffffff" } },
    },
  };

  if (loading) {
    return (
      <div className="p-4 rounded-lg shadow bg-gray-800 text-white">
        <h2 className="text-lg font-semibold mb-4">Portfolio Growth</h2>
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 rounded-lg shadow bg-gray-800 text-white">
        <h2 className="text-lg font-semibold mb-4">Portfolio Growth</h2>
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="p-4 rounded-lg shadow bg-gray-800 text-white">
      <h2 className="text-lg font-semibold mb-4">Portfolio Growth</h2>
      <select
        className="mb-4 p-2 rounded bg-gray-700"
        value={selectedFilter}
        onChange={(e) => setSelectedFilter(e.target.value)}
      >
        <option value="1M">Last Month</option>
        <option value="3M">Last 3 Months</option>
        <option value="1Y">Last Year</option>
      </select>
      <div className="h-64">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default PortfolioGrowthChart;

