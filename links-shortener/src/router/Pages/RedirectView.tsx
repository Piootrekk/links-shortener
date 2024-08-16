import { useParams } from "react-router-dom";
import { useEffect } from "react";
import useFetchCallback from "@/hooks/useFetchCallback";
import { getCustomLink } from "@/supabase/db/selects";
import { singleCustomUrlSchema, TCustomeUrl } from "@/schemas/dbSchema";
import loadUa from "@/lib/uaParser";
import LoadingSpin from "@/components/ui/loading-spin";

const RedirectView = () => {
  const { custom_link } = useParams();
  const { data, execute, isLoading, error } = useFetchCallback<TCustomeUrl>(
    getCustomLink,
    singleCustomUrlSchema
  );
  useEffect(() => {
    execute(custom_link);
  }, []);

  if (isLoading)
    return (
      <div>
        <LoadingSpin />
      </div>
    );
  if (error) return <div>Error: {<p>{error.message}</p>}</div>;
  if (data) {
    const ua = loadUa();
    console.log(ua);
    window.location.href = data.original_url;
  }

  return null;
};

export default RedirectView;
