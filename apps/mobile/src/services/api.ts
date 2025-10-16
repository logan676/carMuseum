/**
 * API Service for AutoVerse Mobile App
 * Connects to AWS Lambda/API Gateway backend
 */

const API_BASE_URL = 'https://7pno67yyze.execute-api.us-east-1.amazonaws.com';

/**
 * Generic API fetch wrapper with error handling
 */
async function apiFetch<T>(endpoint: string): Promise<T> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`);

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Failed to fetch ${endpoint}:`, error);
    throw error;
  }
}

/**
 * API Service methods
 */
export const apiService = {
  /**
   * Health check
   */
  getHealth: () => apiFetch<{ status: string }>('/health'),

  /**
   * Get news articles
   * @param category Optional category filter
   */
  getNews: (category?: string) => {
    const endpoint = category && category !== 'All'
      ? `/api/news?category=${encodeURIComponent(category)}`
      : '/api/news';
    return apiFetch<{
      data: any[];
      availableCategories: string[];
    }>(endpoint);
  },

  /**
   * Get car models (featured and encyclopedia)
   */
  getModels: () => apiFetch<{
    featured: any[];
    encyclopedia: any[];
  }>('/api/models'),

  /**
   * Get car brands
   */
  getBrands: () => apiFetch<{
    data: any[];
  }>('/api/brands'),

  /**
   * Get garage vehicles
   */
  getGarage: () => apiFetch<{
    vehicles: any[];
  }>('/api/garage'),

  /**
   * Get dealership locations
   */
  getDealerships: () => apiFetch<{
    data: any[];
  }>('/api/dealerships'),

  /**
   * Get restoration projects and timeline entries
   */
  getProjects: () => apiFetch<{
    data: any[];
    timeline: any[];
  }>('/api/projects'),

  /**
   * Get all data summary
   */
  getSummary: () => apiFetch<any>('/api/summary'),
};

/**
 * Export API URL for reference
 */
export { API_BASE_URL };
