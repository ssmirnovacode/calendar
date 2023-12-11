import { createContext } from "react";
import { MonthProps } from "../types";

export const MonthContext = createContext<MonthProps>({
  month: "1",
  year: "2000",
});
