import React, { createContext, ReactNode, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface AuthenticatedUserContextType {
  user: any;
  setUser: React.Dispatch<React.SetStateAction<any>>;
}

export const AuthenticatedUserContext = createContext<AuthenticatedUserContextType | any>(undefined);

interface AuthenticatedUserProviderProps {
  children: ReactNode;
}

const USER_STORAGE_KEY = "auth_user";

export const AuthenticatedUserProvider = ({ children }: AuthenticatedUserProviderProps) => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Load user from Async Storage on component mount
    const loadUser = async () => {
      try {
        const userString = await AsyncStorage.getItem(USER_STORAGE_KEY);
        if (userString) {
          setUser(JSON.parse(userString));
        }
      } catch (error) {
        console.error("Failed to load user from AsyncStorage", error);
      }
    };

    loadUser();
  }, []);

  useEffect(() => {
    // Save user to Async Storage whenever it changes
    const saveUser = async () => {
      try {
        if (user) {
          await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
        } else {
          await AsyncStorage.removeItem(USER_STORAGE_KEY);
        }
      } catch (error) {
        console.error("Failed to save user to AsyncStorage", error);
      }
    };

    saveUser();
  }, [user]);

  return <AuthenticatedUserContext.Provider value={{ user, setUser }}>{children}</AuthenticatedUserContext.Provider>;
};
