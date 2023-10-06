import { createContext, useContext } from "react";

export const AppContext = createContext();

export const useAppContext = () => {
  const appContext = useContext(AppContext);
  if (!appContext) {
    throw new Error("useAppContext must be used within <AppContext.Provider>");
  }
  return appContext;
};
