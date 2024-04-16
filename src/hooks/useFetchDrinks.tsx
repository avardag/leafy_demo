import { useState, useEffect } from "react";
import { Drink } from "../shared/types";

export default function useFetchDrinksByIds(idArray: string[]) {
  const [drinks, setDrinks] = useState<Drink[] | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const promises = idArray.map(async (id) => {
          const response = await fetch(
            `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`,
          );
          const data = await response.json();
          return data.drinks ? data.drinks[0] : null;
        });

        const results = await Promise.allSettled(promises);

        const fulfilled = (
          results.filter(
            (r) => r.status === "fulfilled",
          ) as PromiseFulfilledResult<Drink>[]
        ).map((r) => r.value);

        setDrinks(fulfilled.filter((drink) => drink !== null));
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error as Error);
        setDrinks(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [idArray]);

  return { drinks, error, isLoading };
}
