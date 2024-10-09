import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

type Faq = {
  question: string;
  answer: string;
};

const Faq = () => {
  const faqs: Faq[] = [
    {
      question: "What is short URL?",
      answer:
        "A short URL is a shortened form of a URL, which is easier to share and remember. It is a service that takes long URLs and squeezes them into fewer characters to make a link that is easier to share.",
    },
    {
      question: "Why should I use a short URL?",
      answer:
        "Short URLs are easier to share and remember. They are also more visually appealing and can help you track the performance of your links.",
    },
    {
      question: "How do I create a short URL?",
      answer:
        "To create a short URL, simply paste your long URL into the input field above and click the 'Short' button. Your short URL will be generated instantly.",
    },
    {
      question: "How do I share a short URL?",
      answer:
        "To share a short URL, simply copy the link and paste it into an email, text message, or social media post.",
    },
  ];
  return (
    <section className="w-full">
      <h3 className="text-2xl font-bol mb-6">Frequently Asked Questions</h3>
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger>{faq.question}</AccordionTrigger>
            <AccordionContent>{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};

export default Faq;
