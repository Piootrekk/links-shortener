import useFetchCallback from "@/hooks/useFetchCallback";
import { ExternalLink, ArrowRight } from "lucide-react";
import { useEffect } from "react";
import ErrorMessage from "../Error/ErrorMessage";
import { Button } from "../ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../ui/card";
import LoadingSpin from "../ui/loading-spin";
import { validateRedirect } from "@/Api/endpoints";

type DirectMainPageProps = {
  custom_link: string;
};

const DirectMainPage: React.FC<DirectMainPageProps> = ({ custom_link }) => {
  const getOriginalUrl = useFetchCallback(validateRedirect);

  useEffect(() => {
    getOriginalUrl.execute(custom_link);
    const redirectTimeout = setTimeout(() => {
      if (getOriginalUrl.data?.success && getOriginalUrl.data.original_url) {
        window.location.replace(getOriginalUrl.data.original_url);
      }
    }, 100);
    return () => clearTimeout(redirectTimeout);
  }, [getOriginalUrl.data]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <section className="flex items-start justify-center p-4 min-h-screen">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-4">
            <ExternalLink size={48} className="text-blue-400" />
          </div>

          <CardTitle className="text-2xl font-bold text-center">
            You're being redirected
          </CardTitle>
          <CardDescription className=" text-center">
            If you're not redirected automatically, please use the button below.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {getOriginalUrl.error && (
              <ErrorMessage message={getOriginalUrl.error.message} />
            )}
            <Button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white"
              disabled={getOriginalUrl.isLoading}
            >
              {getOriginalUrl.isLoading ? (
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
          </form>
        </CardContent>
      </Card>
    </section>
  );
};

export default DirectMainPage;
