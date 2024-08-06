import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

type TBullshitText = {
  title: string;
  description: string;
};

const Bullshit = () => {
  const bullshitText: TBullshitText[] = [
    {
      title: "What is short URL?",
      description:
        "A short URL is a shortened form of a URL, which is easier to share and remember. It is a service that takes long URLs and squeezes them into fewer characters to make a link that is easier to share.",
    },
    {
      title: "Why should I use a short URL?",
      description:
        "Short URLs are easier to share and remember. They are also more visually appealing and can help you track the performance of your links.",
    },
    {
      title: "How do I create a short URL?",
      description:
        "To create a short URL, simply paste your long URL into the input field above and click the 'Short' button. Your short URL will be generated instantly.",
    },
    {
      title: "How do I share a short URL?",
      description:
        "To share a short URL, simply copy the link and paste it into an email, text message, or social media post.",
    },
  ];
  return (
    <Accordion type="single" collapsible className="w-full my-11 px-11">
      {bullshitText.map((item, index) => (
        <AccordionItem key={index} value={`item-${index}`}>
          <AccordionTrigger>{item.title}</AccordionTrigger>
          <AccordionContent>{item.description}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default Bullshit;
