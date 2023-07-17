import { createContext } from "react";

export const CaptionsContext = createContext<
  { [key: string]: string } | undefined
>({});
