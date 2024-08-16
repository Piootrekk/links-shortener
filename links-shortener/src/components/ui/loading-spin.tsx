import { Loader } from "lucide-react";

const LoadingSpin = () => {
  return (
    <div className="flex items-center justify-center ">
      <Loader className="animate-spin" />
    </div>
  );
};

export default LoadingSpin;
