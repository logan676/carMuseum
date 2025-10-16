/**
 * React hooks for fetching data from AWS API
 */

import { useEffect, useState } from 'react';
import { apiService } from '@/services/api';

interface UseApiDataState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  refetch: () => void;
}

/**
 * Generic hook for API data fetching
 */
function useApiData<T>(
  fetchFn: () => Promise<T>,
  dependencies: any[] = []
): UseApiDataState<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [refetchTrigger, setRefetchTrigger] = useState(0);

  const refetch = () => setRefetchTrigger((prev) => prev + 1);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await fetchFn();
        if (isMounted) {
          setData(result);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err : new Error('Unknown error'));
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [refetchTrigger, ...dependencies]);

  return { data, loading, error, refetch };
}

/**
 * Hook for fetching news articles
 */
export function useNews(category?: string) {
  return useApiData(() => apiService.getNews(category), [category]);
}

/**
 * Hook for fetching car models
 */
export function useModels() {
  return useApiData(() => apiService.getModels());
}

/**
 * Hook for fetching car brands
 */
export function useBrands() {
  return useApiData(() => apiService.getBrands());
}

/**
 * Hook for fetching garage vehicles
 */
export function useGarage() {
  return useApiData(() => apiService.getGarage());
}

/**
 * Hook for fetching dealerships
 */
export function useDealerships() {
  return useApiData(() => apiService.getDealerships());
}

/**
 * Hook for fetching restoration projects
 */
export function useProjects() {
  return useApiData(() => apiService.getProjects());
}

/**
 * Hook for fetching all data summary
 */
export function useSummary() {
  return useApiData(() => apiService.getSummary());
}
