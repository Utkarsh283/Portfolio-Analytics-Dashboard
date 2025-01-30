import { Pie } from "react-chartjs-2";
import { useEffect, useState } from "react";
import { fetchAssetAllocation } from "../api";
import "chart.js/auto";

const AssetAllocationChart = () => {
  const [isDarkMode, setIsDarkMode] = useState(
    document.documentElement.classList.contains("dark")
  );

  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        label: "Asset Allocation",
        data: [],
        backgroundColor: [
          "#ff6384",
          "#36a2eb",
          "#ffce56",
          "#4bc0c0",
          "#7212f0", // Yellow
          "#8bc34a", // Green
        ],
        borderColor: isDarkMode ? "#ffffff" : "#000000",
        hoverBorderColor: "#ffffff",
      },
    ],
  });

  const [loading, setLoading] = useState(true);
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
        const allocation = await fetchAssetAllocation();
        setData({
          labels: allocation.map((asset) => asset.asset),
          datasets: [
            {
              label: "Asset Allocation",
              data: allocation.map((asset) => Number(asset.value)),
              backgroundColor: [
                "#ff6384",
                "#36a2eb",
                "#ffce56",
                "#4bc0c0",
                "#7212f0", // Yellow
                "#8bc34a", // Green
              ],
              borderColor: isDarkMode ? "#ffffff" : "#000000",
              hoverBorderColor: "#ffffff",
            },
          ],
        });
      } catch (err) {
        setError("Failed to load asset allocation data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [isDarkMode]);

  if (loading) {
    return (
      <div className="p-4 bg-gray-800 text-white rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Asset Allocation</h2>
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-gray-800 text-white rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Asset Allocation</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="p-4 bg-gray-800 text-white rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4">Asset Allocation</h2>
      <div className="h-96 w-full">
        <Pie
          data={data}
          options={{
            maintainAspectRatio: false,
            legend: {
              labels: {
                color: "#ffffff",
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default AssetAllocationChart;


