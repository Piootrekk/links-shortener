import ErrorMessage from "@/components/Error/ErrorMessage";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import useDbAuth from "@/hooks/useDbAuth";
import { Filter } from "lucide-react";

const DashboardView = () => {
  const { data } = useDbAuth();

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-8">
        <div className="flex flex-row flex-wrap gap-4 mt-12 w-full">
          <Card className="flex-1">
            <CardHeader>
              <CardTitle>Your Links Created</CardTitle>
            </CardHeader>
            <CardContent>
              <p>0</p>
            </CardContent>
          </Card>
          <Card className="flex-1">
            <CardHeader>
              <CardTitle>Total Links Created</CardTitle>
            </CardHeader>
            <CardContent>
              <p>0</p>
            </CardContent>
          </Card>
          <Card className="flex-1">
            <CardHeader>
              <CardTitle>Total Links Created</CardTitle>
            </CardHeader>
            <CardContent>
              <p>0</p>
            </CardContent>
          </Card>
          <Card className="flex-1">
            <CardHeader>
              <CardTitle>Your Links Clicked</CardTitle>
            </CardHeader>
            <CardContent>
              <p>0</p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="flex justify-between">
        <h1 className="text-4xl font-bold">My Links:</h1>
        <Button variant="default">Create New</Button>
      </div>
      <div className="relative">
        <Input type="text" placeholder="Search for a link" />
        <Filter className="absolute top-2 right-2 p-1" />
      </div>
      <ErrorMessage className="text-xl text-center" message="No links found." />
    </div>
  );
};

export default DashboardView;
