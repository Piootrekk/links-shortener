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
type NotFoundProps = {
  alertText?: string;
};
const Error: React.FC<NotFoundProps> = ({ alertText }) => {
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
          <Button variant="ghost" className="w-full" asChild>
            <Link to="/">Go back to home</Link>
          </Button>
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

export { NotFound, Forbidden, Unauthorized };

export default Error;
