import { cn } from "@/lib/utils";

type ErrorMessageProps = {
  message?: string;
  className?: string;
};

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, className }) => {
  return <p className={cn("text-red-500 text-sm", className)}>{message}</p>;
};

export default ErrorMessage;
