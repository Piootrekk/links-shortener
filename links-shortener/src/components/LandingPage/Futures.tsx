import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Link,
  ScanQrCode,
  ChartNoAxesCombined,
  Timer,
  User,
  UserX,
  FileLock2,
  Map,
} from "lucide-react";

const Futures = () => {
  const features = [
    {
      title: "Custom Link",
      description:
        "Create a custom link to make it more memorable and easy to share.",
      icon: Link,
    },
    {
      title: "QR Code",
      description:
        "Generate a QR code for your short URL to share it more easily.",
      icon: ScanQrCode,
    },
    {
      title: "Analytics",
      description:
        "Track the performance of your short URLs with our built-in analytics.",
      icon: ChartNoAxesCombined,
    },
    {
      title: "Profiled URLs",
      description: "Create a profile to manage all your URLs in one place.",
      icon: User,
    },
    {
      title: "Anonymously",
      description: "Create a short link without creating an account.",
      icon: UserX,
    },
    {
      title: "Protected",
      description: "Create a short link with password protection.",
      icon: FileLock2,
    },
    {
      title: "Map Clicks",
      description: "Get a real-time map of clicks on your short URL.",
      icon: Map,
    },
    {
      title: "Timed URL",
      description:
        "Set an expiration date for your short URL to limit its availability. (Feature Soon!)",
      icon: Timer,
    },
  ];
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
      {features.map((feature, index) => (
        <Card key={index} className="bg-secondary">
          <CardHeader>
            <feature.icon className="w-10 h-10 text-blue-400 mb-2" />
            <CardTitle>{feature.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>{feature.description}</CardDescription>
          </CardContent>
        </Card>
      ))}
    </section>
  );
};

export default Futures;
