import { useState, useEffect, useCallback } from 'preact/compat';

interface FetchState<T> {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
}

interface UseFetchOptions {
  method?: string;
  headers?: HeadersInit;
  body?: BodyInit | null;
}

export default function useFetch<T = unknown>(
  url: string | null,
  options: UseFetchOptions = {}
): FetchState<T> {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    isLoading: !!url,
    error: null,
  });

  const fetchData = useCallback(async () => {
    if (!url) {
      setState({ data: null, isLoading: false, error: null });
      return;
    }

    setState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      const config: RequestInit = {
        method: options.method || 'GET',
        headers: options.headers || {},
        ...options,
      };

      const response = await fetch(url, config);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data: T = await response.json();
      setState({ data, isLoading: false, error: null });
    } catch (err) {
      const error =
        err instanceof Error ? err : new Error('An unknown error occurred');
      setState({ data: null, isLoading: false, error });
    }
  }, [url, JSON.stringify(options)]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return state;
}
