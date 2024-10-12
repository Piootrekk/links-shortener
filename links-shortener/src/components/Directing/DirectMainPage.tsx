// TODO zmienić to trochę politkę initRequest oraz PostRequest

import { redirectingToUrl, validatePassword } from "@/Api/endpoints";
import useFetchCallback from "@/hooks/useFetchCallback";
import { ExternalLink, ArrowRight, Lock } from "lucide-react";
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
import SkeletonUniversal from "../Loading/SkeletonUniversal";
import { Input } from "../ui/input";

type DirectMainPageProps = {
  custom_link: string;
};

const DirectMainPage: React.FC<DirectMainPageProps> = ({ custom_link }) => {
  const initRedirect = useFetchCallback(redirectingToUrl);
  const postPasswordToRedirect = useFetchCallback(validatePassword);

  useEffect(() => {
    if (!initRedirect.data) {
      initRedirect.execute(custom_link);
    } else if (
      initRedirect.data &&
      initRedirect.data.original_url &&
      !initRedirect.data.password
    ) {
      window.location.replace(initRedirect.data.original_url);
    }
    if (postPasswordToRedirect.data) {
      window.location.replace(initRedirect.data!.original_url);
    }
  }, [initRedirect.data, postPasswordToRedirect.data]);

  const handleRedirect = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    if (initRedirect.data?.original_url && !initRedirect.data?.password) {
      window.location.replace(initRedirect.data.original_url);
    } else {
      postPasswordToRedirect.execute(
        custom_link,
        formData.get("password") as string
      );
    }
  };
  if (initRedirect.isLoading) {
    return <SkeletonUniversal />;
  }
  return (
    <section className="flex justify-center my-48 h-full">
      <Card className="space-y-8 flex flex-col justify-center items-center">
        <CardHeader>
          <ExternalLink className="w-16 h-16 self-center" />
          <CardTitle>You're being redirected to the original URL</CardTitle>
          <CardDescription>
            If you're not redirected automatically, please click the button
            below.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            className="flex flex-col justify-center items-center"
            onSubmit={handleRedirect}
          >
            {initRedirect.data?.password && (
              <div className="flex flex-col gap-4">
                <div className="flex flex-row">
                  <Lock className="w-6 h-6" />
                  <span>This link is password protected</span>
                </div>
                <Input type="password" placeholder="Password" name="password" />
              </div>
            )}
            {initRedirect.error && (
              <ErrorMessage
                message={initRedirect.error.message}
                className="text-lg text-center"
              />
            )}
            {postPasswordToRedirect.error && (
              <ErrorMessage
                message={postPasswordToRedirect.error.message}
                className="text-lg text-center"
              />
            )}
            <Button
              className=" gap-2 w-2/3 mt-6"
              size={"lg"}
              variant={"outline"}
              disabled={initRedirect.isLoading}
            >
              {initRedirect.isLoading || postPasswordToRedirect.isLoading ? (
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
