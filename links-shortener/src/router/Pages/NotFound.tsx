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

const NotFound = () => {
  return (
    <div className="flex justify-center items-center mt-20 text-center">
      <Card className="w-[450px]">
        <CardHeader>
          <CardTitle className="text-3xl text-red-500">
            <div className="flex flex-row gap-2 flex-wrap">
              <AlertTriangle size={36} />
              404 - Page not found!
              <AlertTriangle size={36} />
            </div>
          </CardTitle>
          <CardDescription>
            The page you are looking for does not exist.
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

export default NotFound;
