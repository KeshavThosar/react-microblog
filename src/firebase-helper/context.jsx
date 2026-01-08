import { db, auth } from "./utils";
import { onAuthStateChanged } from "firebase/auth";

export default function FirebaseAppContextProvider({ children }) {
  let authUser = null;
  onAuthStateChanged(auth, (user) => {
    authUser = user;
  });

  return (
    <FirebaseAppContext.Provider value={{ db, auth, user: authUser }}>
      {children}
    </FirebaseAppContext.Provider> 
  );
}