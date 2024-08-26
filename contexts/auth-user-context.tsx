import React, { createContext, ReactNode, useState } from "react";

interface AuthenticatedUserContextType {
  user: any;
  setUser: React.Dispatch<React.SetStateAction<any>>;
}

export const AuthenticatedUserContext = createContext<AuthenticatedUserContextType | any>({ undefined });
interface AuthenticatedUserProviderProps {
  children: ReactNode;
}

export const AuthenticatedUserProvider = ({ children }: AuthenticatedUserProviderProps) => {
  const [user, setUser] = useState<any>(null);

  return <AuthenticatedUserContext.Provider value={{ user, setUser }}>{children}</AuthenticatedUserContext.Provider>;
};
