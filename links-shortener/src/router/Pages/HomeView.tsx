import Faq from "@/components/LandingPage/Faq";
import Futures from "@/components/LandingPage/Futures";
import LinkAnonymous from "@/components/LandingPage/LinkAnonymous";

const LandingView = () => {
  return (
    <>
      <div className="flex flex-col items-center">
        <section className="text-center mb-12">
          <h2 className="text-5xl font-bold mb-4 ">Short or hide your link</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Create short, custom, and secure links in seconds!
          </p>
          <LinkAnonymous />
        </section>
        <Futures />
        <Faq />
      </div>
    </>
  );
};

export default LandingView;
