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
  Bell,
} from "lucide-react";

type TCardItem = {
  title: string;
  description: string;
  icon: JSX.Element;
};

const Futures = () => {
  const cardItems: TCardItem[] = [
    {
      title: "Custom Link",
      description:
        "Create a custom link to make it more memorable and easy to share.",
      icon: <Link className="h-12 w-12" />,
    },
    {
      title: "QR Code",
      description:
        "Generate a QR code for your short URL to share it more easily.",
      icon: <ScanQrCode className="h-12 w-12" />,
    },
    {
      title: "Analytics",
      description:
        "Track the performance of your short URLs with our built-in analytics.",
      icon: <ChartNoAxesCombined className="h-12 w-12" />,
    },
    {
      title: "Profiled URLs",
      description: "Create a profile to manage all your URLs in one place.",
      icon: <User className="h-12 w-12" />,
    },
    {
      title: "Anonymously",
      description: "Create a short link without creating an account.",
      icon: <UserX className="h-12 w-12" />,
    },
    {
      title: "Protected",
      description:
        "Create a short link with password protection. (Feature Soon!).",
      icon: <FileLock2 className="h-12 w-12" />,
    },
    {
      title: "Timed URL",
      description:
        "Set an expiration date for your short URL to limit its availability. (Feature Soon!)",
      icon: <Timer className="h-12 w-12" />,
    },
    {
      title: "Notifications",
      description:
        "Get mail notified when your short URL is clicked. (Feature Soon!)",
      icon: <Bell className="h-12 w-12" />,
    },
  ];
  return (
    <div className="flex flex-row flex-wrap justify-center items-stretch gap-4 pt-24 py-11 w-3/4 ">
      {cardItems.map((item, index) => (
        <Card key={index} className="w-48">
          <CardHeader className="flex flex-col gap-2 items-center">
            <CardTitle>{item.title}</CardTitle>
            {item.icon}
          </CardHeader>
          <CardContent>
            <CardDescription className="text-center">
              {item.description}
            </CardDescription>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Futures;
