import { cn } from "@/lib/utils";

type ErrorMessageProps = {
  message?: string;
  className?: string;
};

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, className }) => {
  return (
    <span className={cn("text-red-500 text-sm", className)}>{message}</span>
  );
};

export default ErrorMessage;
