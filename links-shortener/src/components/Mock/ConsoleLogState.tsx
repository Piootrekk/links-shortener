import { useEffect } from "react";

type ConsoleLogStateProps = {
  items: any | any[];
};

const ConsoleLogState: React.FC<ConsoleLogStateProps> = (items) => {
  useEffect(() => {
    console.log("urls", items);
  }, [items]);

  return null;
};

export default ConsoleLogState;
