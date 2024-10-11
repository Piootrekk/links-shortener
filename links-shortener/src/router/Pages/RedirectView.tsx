import { redirectingToUrl } from "@/Api/endpoints";
import ErrorMessage from "@/components/Error/ErrorMessage";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import LoadingSpin from "@/components/ui/loading-spin";
import useInstantFetch from "@/hooks/useInstantFetch";
import { ArrowRight, ExternalLink } from "lucide-react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const RedirectView = () => {
  const { custom_link } = useParams();
  const navigate = useNavigate();
  if (!custom_link) {
    navigate("/404", { replace: true });
    return null;
  }
  const { data, error, isLoading } = useInstantFetch(redirectingToUrl, [
    custom_link,
  ]);

  useEffect(() => {
    if (data?.original_url) {
      window.location.replace(data.original_url);
    }
  }, [data]);

  return (
    <section className="flex justify-center my-48 h-full">
      <Card className="space-y-8">
        <CardHeader>
          <ExternalLink className="w-16 h-16 self-center" />
          <CardTitle>You're being redirected to the original URL</CardTitle>
          <CardDescription>
            If you're not redirected automatically, please click the button
            below.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center items-center">
          <Button
            className=" gap-2 w-2/3"
            size={"lg"}
            variant={"outline"}
            disabled={isLoading}
            onClick={() => window.location.replace(data!.original_url)}
          >
            {isLoading ? (
              <>
                <LoadingSpin /> <span>Redirecting...</span>
              </>
            ) : (
              <>
                <span>Go to destination</span>
                <ArrowRight />
              </>
            )}
          </Button>
        </CardContent>
      </Card>
      {error && <ErrorMessage message={error.message} className="text-4xl" />}
    </section>
  );
};

export default RedirectView;
