import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
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
            "group-[.toaster]:bg-green-100 group-[.toaster]:text-green-900 dark:group-[.toaster]:bg-green-900 dark:group-[.toaster]:text-green-100",
          error:
            "group-[.toaster]:bg-red-100 group-[.toaster]:text-red-900 dark:group-[.toaster]:bg-red-900 dark:group-[.toaster]:text-red-100",
          warning:
            "group-[.toaster]:bg-yellow-100 group-[.toaster]:text-yellow-900 dark:group-[.toaster]:bg-yellow-900 dark:group-[.toaster]:text-yellow-100",
          info: "group-[.toaster]:bg-blue-100 group-[.toaster]:text-blue-900 dark:group-[.toaster]:bg-blue-900 dark:group-[.toaster]:text-blue-100",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
