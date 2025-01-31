import { Bar } from "react-chartjs-2";
import { useEffect, useState } from "react";
import { fetchStrategyPerformance } from "../api";
import "chart.js/auto";
import { OrbitProgress } from "react-loading-indicators";

const StrategyComparison = () => {
  const [isDarkMode, setIsDarkMode] = useState(
    document.documentElement.classList.contains("dark")
  );
  const [chartData, setChartData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDarkMode(document.documentElement.classList.contains("dark"));
    });

    observer.observe(document.documentElement, { attributes: true });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchStrategyPerformance();
        setChartData({
          labels: data.map((strategy) => strategy.name),
          datasets: [
            {
              label: "ROI (%)",
              data: data.map((strategy) => strategy.roi),
              backgroundColor: [
                "#3b82f6",
                "#ef4444",
                "#10b981",
                "#facc15",
                "#6366f1",
                "#8b5cf6",
              ],
              borderColor: isDarkMode ? "#ffffff" : "#000000",
            },
          ],
        });
      } catch (err) {
        setError("Failed to fetch strategy performance data.");
      }
    };

    fetchData();
  }, [isDarkMode]);

  if (error) {
    return (
      <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <p className="text-center text-white">{error}</p>
      </div>
    );
  }

  if (!chartData) {
    return (
      <div className="flex items-center justify-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md h-64">
        <OrbitProgress variant="track-disc" dense color="#32cd32" size="medium" text="" textColor="" />
      </div>
    );
  }

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: "#ffffff",
        },
      },
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: "Strategy",
          color: "#ffffff",
        },
        ticks: {
          color: "#ffffff",
        },
      },
      y: {
        display: true,
        title: {
          display: true,
          text: "ROI %",
          color: "#ffffff",
        },
        ticks: {
          beginAtZero: true,
          color: "#ffffff",
        },
      },
    },
  };

  return (
    <div
      className={`p-4 rounded-lg shadow-md bg-gray-800 text-white`}
    >
      <h2 className="text-lg font-semibold mb-4">Strategy Comparison</h2>
      <div className="h-64 w-full">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
};

export default StrategyComparison;


