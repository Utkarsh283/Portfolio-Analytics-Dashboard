import { Link } from "react-router-dom";
import PortfolioSummary from "../components/PortfolioSummary";
import PortfolioGrowthChart from "../components/PortfolioGrowthChart";
import AssetAllocationChart from "../components/AssetAllocationChart";
import StrategyPerformanceTable from "../components/StrategyPerformanceTable";
import MarketUpdates from "../components/MarketUpdates";

const Dashboard = () => {
  return (
    <div className="p-6 space-y-6">
      {/* Portfolio Summary */}
      <PortfolioSummary />

      {/* Strategy Comparison Button */}
      <div className="flex justify-end">
        <Link to="/strategy-comparison">
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
            Compare Strategies
          </button>
        </Link>
      </div>

      {/* 2x2 Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Row 1 */}
        <PortfolioGrowthChart className="w-full" />
        <AssetAllocationChart className="w-full" />

        {/* Row 2 */}
        <StrategyPerformanceTable className="w-full" />
        <MarketUpdates className="w-full" />
      </div>
    </div>
  );
};

export default Dashboard;

