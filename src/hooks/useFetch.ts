import { useEffect, useState } from "react";

interface FetchResult<T> {
  url: string;
  data: T | null;
  error: string | null;
}

export default function useFetch<T>(url: string) {
  const [result, setResult] = useState<FetchResult<T> | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const fetchData = async () => {
      try {
        const res = await fetch(url, {
          signal: controller.signal,
        });
        if (!res.ok) throw new Error(`Ошибка: ${res.status}`);

        const json = (await res.json()) as T;
        if (!controller.signal.aborted) {
          setResult({ url, data: json, error: null });
        }
      } catch (e) {
        if (controller.signal.aborted) return;

        setResult({
          url,
          data: null,
          error: e instanceof Error ? e.message : "Неизвестная ошибка запроса",
        });
      }
    };
    fetchData();

    return () => controller.abort();
  }, [url]);

  const isLoading = result === null || result.url !== url;

  return {
    data: isLoading ? null : result.data,
    isLoading,
    error: isLoading ? null : result.error,
  };
}
