import { useState, useEffect } from "react";

// This custom hook takes in a URI and returns the data, error, and isLoading state.
//T is the generic type for the data that is returned from the API.
//takes in the URI(string) to fetch from.
export const useFetch = <T,>(
  uri: string,
): { data: T | null; error: Error | null; isLoading: boolean } => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(uri);
        if (!response.ok) {
          throw new Error(`Error fetching data: ${response.statusText}`);
        }
        const fetchedData = (await response.json()) as T; // Type assertion for generic type
        setData(fetchedData);
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [uri]);

  return { data, error, isLoading };
};
