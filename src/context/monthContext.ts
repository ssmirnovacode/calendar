import { createContext } from "react";
import { MonthProps } from "../types";

export const MonthContext = createContext<MonthProps | undefined>(undefined);
