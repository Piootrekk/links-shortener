import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";
import React from "react";
type NotFoundProps = {
  alertText?: string;
  extraButtonAction?: React.ReactNode;
};
const Error: React.FC<NotFoundProps> = ({ alertText, extraButtonAction }) => {
  return (
    <div className="flex justify-center items-center mt-20 text-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-3xl text-red-500">
            <div className="flex flex-row justify-center mb-8 gap-2 flex-wrap">
              <AlertTriangle size={36} />
              Fatal Error
              <AlertTriangle size={36} />
            </div>
          </CardTitle>
          <CardDescription>
            {alertText ? alertText : "Unknown error"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {extraButtonAction ? (
            extraButtonAction
          ) : (
            <Button variant="ghost" className="w-full" asChild>
              <Link to="/">Back to home</Link>
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

const NotFound = () => (
  <Error alertText="The page you are looking for does not exist." />
);
const Forbidden = () => (
  <Error alertText="You are not allowed to access this page." />
);
const Unauthorized = () => (
  <Error alertText="You are not authorized to access this page." />
);

const UnableToEstablishConnection = () => (
  <Error
    alertText="Unable to establish connection to the server."
    extraButtonAction={
      <Button
        variant="outline"
        className="w-full text-wrap"
        onClick={(_) => window.location.reload()}
      >Retry to connect by refreshing page</Button>
    }
  />
);

export { NotFound, Forbidden, Unauthorized, UnableToEstablishConnection };

export default Error;
