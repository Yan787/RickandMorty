import { useEffect, useState } from "react";

export default function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setData(null);
    setError(null);
    setIsLoading(true);

    const controller = new AbortController();
    const fetchData = async () => {
      try {
        const res = await fetch(url, {
          signal: controller.signal,
        });
        if (!res.ok) setError(`Ошибка: ${res.status}`);
        else {
          const json = (await res.json()) as T;
          setData(json);
        }
      } catch (e) {
        if (e instanceof Error) {
          if (e.name === "AbortError") console.log(`Отмена запроса ${url}`);
          else setError(`Ошибка: ${e.message}`);
        }
      } finally {
        if (!controller.signal.aborted) setIsLoading(false);
      }
    };
    fetchData();

    return () => controller.abort();
  }, [url]);

  return { data, isLoading, error };
}
