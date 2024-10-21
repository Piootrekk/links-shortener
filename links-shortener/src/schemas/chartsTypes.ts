import { TDetails } from "./dbSchema";

type TTalbeHeaders = {
  header: string;
  key: keyof TDetails;
  allowToChart: boolean;
};

export type { TTalbeHeaders };
