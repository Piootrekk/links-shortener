import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Filter } from "lucide-react";

const DashboardView = () => {
  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-2 gap-4 mt-12">
        <Card>
          <CardHeader>
            <CardTitle>Total Links Created</CardTitle>
          </CardHeader>
          <CardContent>
            <p>0</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Links Clicked</CardTitle>
          </CardHeader>
          <CardContent>
            <p>0</p>
          </CardContent>
        </Card>
      </div>
      <div className="flex justify-between">
        <h1 className="text-4xl font-bold">My Links:</h1>
        <Button variant="default">Create New</Button>
      </div>
      <div className="relative">
        <Input type="text" placeholder="Search for a link" />
        <Filter className="absolute top-2 right-2 p-1" />
      </div>
    </div>
  );
};

export default DashboardView;
