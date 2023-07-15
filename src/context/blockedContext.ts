import { createContext } from "react";

type BlockedContextProps = {};
export const BlockedContext = createContext<BlockedContextProps | undefined>(
  undefined
);
