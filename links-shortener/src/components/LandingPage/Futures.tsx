import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Futures = () => {
  return (
    <div className="flex flex-row flex-wrap items-center gap-4 py-11 ">
      <Card>
        <CardHeader>
          <CardTitle>Shorten your link</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>
            Shorten your link to make it easier to share
          </CardDescription>
        </CardContent>
        <CardFooter>Learn more</CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Hide your link</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>
            Hide your link to prevent it from being shared
          </CardDescription>
        </CardContent>
        <CardFooter>Learn more</CardFooter>
      </Card>
    </div>
  );
};

export default Futures;
