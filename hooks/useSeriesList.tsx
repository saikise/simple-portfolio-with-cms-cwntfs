import { getSeries } from "@/lib/data";
import { Series } from "@/lib/types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";

// Client-side fetch of series list
export const useSeriesList = () => {
  const [seriesList, setSeriesList] = useState<Series[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClientComponentClient();

  useEffect(() => {
    const fetchSeriesList = async () => {
      try {
        setLoading(true);
        const seriesList = await getSeries({ supabase });
        setSeriesList(seriesList);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchSeriesList();
  }, []);

  return { seriesList, loading };
};
