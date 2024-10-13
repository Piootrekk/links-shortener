import { validateRedirect } from "@/Api/endpoints";
import useFetchCallback from "@/hooks/useFetchCallback";
import { useEffect } from "react";
import ErrorMessage from "../Error/ErrorMessage";
import { ExternalLink, ArrowRight, Lock } from "lucide-react";
import { Button } from "../ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../ui/card";
import { Input } from "../ui/input";
import LoadingSpin from "../ui/loading-spin";

type DirectWithPasswordProps = {
  custom_link: string;
};

const DirectWithPassword: React.FC<DirectWithPasswordProps> = ({
  custom_link,
}) => {
  const postPasswordToRedirect = useFetchCallback(validateRedirect);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const formData = new FormData(e.currentTarget);
    const inputPassword = formData.get("password") as string;
    if (!inputPassword) return;
    postPasswordToRedirect.execute(custom_link, inputPassword);
  };

  useEffect(() => {
    if (postPasswordToRedirect.data?.success) {
      window.location.replace(postPasswordToRedirect.data.original_url);
    }
  }, [postPasswordToRedirect.data]);

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
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Lock size={16} />
                <span>This link is password protected</span>
              </div>
              <Input type="password" placeholder="Password" name="password" />
            </div>
            {postPasswordToRedirect.error && (
              <ErrorMessage
                message={postPasswordToRedirect.error.message}
                className="text-center"
              />
            )}
            <Button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white"
              disabled={postPasswordToRedirect.isLoading}
            >
              {postPasswordToRedirect.isLoading ? (
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
        <CardFooter className="justify-center text-muted-foreground">
          <p className="text-xs">Secured by LinkShortener™</p>
        </CardFooter>
      </Card>
    </section>
  );
};

export default DirectWithPassword;
