import { createContext, useContext } from "react";
export const FirebaseAppContext = createContext();

export function useFirebaseAppContext() {
  return useContext(FirebaseAppContext);
}