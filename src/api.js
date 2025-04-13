

const API_URL = "https://portfolio-backend-three-chi.vercel.app/api"

const fetchAPI = async (url) => {
  try {
    const res = await fetch(`${API_URL}/${url}`);
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    return res.json();
  } catch (error) {
    console.error(`Error fetching ${url}:`, error);
    throw error;
  }
};

export const fetchPortfolioSummary = () => fetchAPI("portfolio/summary");
export const fetchPortfolioGrowth = () => fetchAPI("portfolio/growth");
export const fetchAssetAllocation = () => fetchAPI("portfolio/allocation");
export const fetchStrategyPerformance = () => fetchAPI("strategy/performance");
export const fetchMarketUpdates = () => fetchAPI("market/updates");
