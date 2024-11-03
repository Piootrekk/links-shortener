import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
          success:
            "group-[.toaster]:bg-green-600 group-[.toaster]:text-green-100 ",
          error: "group-[.toaster]:bg-red-600 group-[.toaster]:text-red-100 ",
          warning:
            "group-[.toaster]:bg-yellow-600 group-[.toaster]:text-yellow-100 ",
          info: "group-[.toaster]:bg-blue-600 group-[.toaster]:text-blue-100 ",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
