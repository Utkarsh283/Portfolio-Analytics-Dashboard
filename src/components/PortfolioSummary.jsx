import { useEffect, useState } from "react";
import { fetchPortfolioSummary } from "../api";
import { OrbitProgress } from "react-loading-indicators";

const PortfolioSummary = () => {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getSummary = async () => {
      try {
        const data = await fetchPortfolioSummary();
        setSummary(data);
      } catch (err) {
        setError("Failed to fetch portfolio summary.");
      } finally {
        setLoading(false);
      }
    };

    getSummary();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <OrbitProgress variant="track-disc" dense color="#32cd32" size="medium" text="" textColor="" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <p className="text-center text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {Object.entries(summary).map(([key, value]) => (
        <div
          key={key}
          className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md"
        >
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
            {key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
          </h3>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {typeof value === "number" ? value.toLocaleString() : value}
          </p>
        </div>
      ))}
    </div>
  );
};

export default PortfolioSummary;


