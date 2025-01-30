import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import StrategyComparisonPage from "./pages/StrategyComparisonPage";
import "./index.css";

function App() {
  return (
    <Router basename="/Portfolio-Analytics-Dashboard">
      <div className="bg-gray-100 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-gray-100">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/strategy-comparison" element={<StrategyComparisonPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

