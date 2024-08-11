import { useAuth } from "@/context/AuthContext";
import useFetchCallback from "@/hooks/useFetchCallback";
import { getAll, getAllAuthroized } from "@/supabase/db/selects";
import { urlsArraySchema, TUrls } from "@/schemas/dbSchema";

import { useEffect } from "react";

const useDbAuth = () => {
  const { user } = useAuth();
  const {
    data,
    error,
    isLoading,
    execute: fetchUrl,
  } = useFetchCallback<TUrls>(getAllAuthroized, urlsArraySchema);

  useEffect(() => {
    fetchUrl(user?.id);
  }, []);

  return { data, error, isLoading };
};

const useDbUnauth = () => {
  const {
    data,
    error,
    isLoading,
    execute: fetchUrl,
  } = useFetchCallback<TUrls>(getAllAuthroized, urlsArraySchema);

  useEffect(() => {
    fetchUrl();
  }, []);

  return { data, error, isLoading };
};

const useDbAll = () => {
  const {
    data,
    error,
    isLoading,
    execute: fetchUrl,
  } = useFetchCallback<TUrls>(getAll, urlsArraySchema);

  useEffect(() => {
    fetchUrl();
  }, []);

  return { data, error, isLoading };
};

export { useDbAuth, useDbAll, useDbUnauth };
