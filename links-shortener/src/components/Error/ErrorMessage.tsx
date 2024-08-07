type ErrorMessageProps = {
  message: string | undefined;
};

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return <span className="text-red-500 text-sm">{message}</span>;
};

export default ErrorMessage;
