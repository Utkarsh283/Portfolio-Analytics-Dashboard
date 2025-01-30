import StrategyComparison from "../components/StrategyComparison";
import { Link } from "react-router-dom";

const StrategyComparisonPage = () => {
  return (
    <div className="p-6 space-y-6">
      {/* Back to Dashboard Button */}
      <div className="flex justify-start">
        <Link to="/">
          <button className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition">
            ← Back to Dashboard
          </button>
        </Link>
      </div>

      {/* Strategy Comparison */}
      <StrategyComparison />
    </div>
  );
};

export default StrategyComparisonPage;
