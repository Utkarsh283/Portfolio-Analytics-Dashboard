import { useEffect, useState } from "react";
import { fetchStrategyPerformance } from "../api";
import { OrbitProgress } from "react-loading-indicators";

const StrategyPerformanceTable = () => {
  const [strategies, setStrategies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchStrategyPerformance();
        setStrategies(data);
      } catch (err) {
        setError("Failed to fetch strategy performance data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md flex items-center justify-center">
        <OrbitProgress variant="track-disc" dense color="#32cd32" size="medium" text=" " textColor="" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
        <p className="text-center text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-2 text-black dark:text-white">
        Strategy Performance
      </h2>
      <table className="w-full border-collapse border border-gray-200 dark:border-gray-700">
        <thead>
          <tr className="bg-gray-100 dark:bg-gray-700">
            <th className="border p-2 text-left dark:border-gray-600">Strategy</th>
            <th className="border p-2 text-left dark:border-gray-600">ROI (%)</th>
            <th className="border p-2 text-left dark:border-gray-600">CAGR (%)</th>
            <th className="border p-2 text-left dark:border-gray-600">Drawdown (%)</th>
          </tr>
        </thead>
        <tbody>
          {strategies.map((strategy, idx) => (
            <tr
              key={idx}
              className={`text-center ${
                idx % 2 === 0 ? "bg-gray-50 dark:bg-gray-800" : "bg-white dark:bg-gray-900"
              }`}
            >
              <td className="border p-2 dark:border-gray-600">{strategy.name}</td>
              <td className="border p-2 dark:border-gray-600">{strategy.roi}</td>
              <td className="border p-2 dark:border-gray-600">{strategy.cagr}</td>
              <td className="border p-2 dark:border-gray-600">{strategy.drawdown}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StrategyPerformanceTable;

