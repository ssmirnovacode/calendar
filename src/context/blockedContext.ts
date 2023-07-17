import { createContext } from "react";

export const BlockedContext = createContext<string[] | undefined>(undefined);
