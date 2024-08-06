import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Bullshit from "@/components/LandingPage/Bullshit";
import Futures from "@/components/LandingPage/Futures";

const LandingView = () => {
  const handleForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted");
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="my-14 sm:my-24 sm:text-6xl lg:text-7xl text-4xl font-extrabold text-center text-wrap">
        Short or hide your link👇👇
      </h1>
      <form
        onClick={handleForm}
        className="sm:h-14  flex flex-col flex-wrap items-center gap-2 justify-center w-1/2"
      >
        <Input
          type="url"
          placeholder="Enter your link"
          className="h-full flex-1 p-4"
        />
        <Button type="submit" variant="outline" className="h-full">
          Short
        </Button>
      </form>
      <Futures />
      <Bullshit />
    </div>
  );
};

export default LandingView;
