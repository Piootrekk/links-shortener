import Bullshit from "@/components/LandingPage/Bullshit";
import Futures from "@/components/LandingPage/Futures";
import LinkAnonymous from "@/components/LandingPage/LinkAnonymous";

const LandingView = () => {
  return (
    <div className="flex flex-col items-center">
      <h1 className="my-14 sm:my-24 sm:text-6xl lg:text-7xl text-4xl font-extrabold text-center text-wrap">
        Short or hide your link👇👇
      </h1>
      <LinkAnonymous />
      <Futures />
      <Bullshit />
    </div>
  );
};

export default LandingView;
