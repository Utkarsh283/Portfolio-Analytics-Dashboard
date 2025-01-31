import { useEffect, useState } from "react";
import { fetchMarketUpdates } from "../api";
import { OrbitProgress } from "react-loading-indicators";

const MarketUpdates = () => {
  const [updates, setUpdates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getUpdates = async () => {
      try {
        const data = await fetchMarketUpdates();
        setUpdates(data);
      } catch (err) {
        setError("Failed to fetch market updates.");
      } finally {
        setLoading(false);
      }
    };

    getUpdates();
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
        <h2 className="text-xl font-bold mb-2">📢 Market Updates</h2>
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (updates.length === 0) {
    return (
      <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-2">📢 Market Updates</h2>
        <p>No market updates available at the moment.</p>
      </div>
    );
  }

  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-2">📢 Market Updates</h2>
      <ul className="space-y-2">
        {updates.map((update, index) => (
          <li key={index} className="border-b py-2 dark:border-gray-600">
            <span className="text-sm text-gray-500 dark:text-gray-400">{update.date}</span>
            <p className="text-gray-700 dark:text-gray-300">{update.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MarketUpdates;


