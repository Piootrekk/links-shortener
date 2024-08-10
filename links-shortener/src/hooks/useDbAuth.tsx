import { useAuth } from "@/context/AuthContext";
import useFetchCallback from "@/hooks/useFetchCallback";
import { getAllAuthUrls } from "@/supabase/db/urls";

import { useEffect } from "react";
import { urlsArraySchema, TUrlsArray } from "@/schemas/urlSchema";
const useDbAuth = () => {
  const { user } = useAuth();
  const {
    data,
    error,
    execute: fetchUrl,
  } = useFetchCallback<TUrlsArray>(getAllAuthUrls, urlsArraySchema);

  useEffect(() => {
    fetchUrl(user?.id);
  }, []);

  // useEffect(() => {
  //   if (urls) {
  //     const urls_ids = urls.map((url) => url.id);
  //     if (urls_ids.length > 0) fetchDetails(urls_ids);
  //   }
  // });

  useEffect(() => {
    console.log("urls", data);
    console.log("error", error);
  }, [data, error]);

  // useEffect(() => {
  //   console.log("details", data);
  // }, [data]);

  return { data };
};

export default useDbAuth;
