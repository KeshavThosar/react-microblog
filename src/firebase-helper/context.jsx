import { useEffect, useState } from "react";
import { db, auth, FirebaseAppContext } from "./config";
import { onAuthStateChanged } from "firebase/auth";
import { login, logout, registerUser } from "./utils/auth";

export function FirebaseAppContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
      if(user) {
        setUserLoggedIn(true);
      }else{
        setUserLoggedIn(false);
      }
    });
  }, []);


  const context = {
    db, 
    auth: { ...auth, login, register: registerUser, logout }, 
    user : { ...user, loggedIn: userLoggedIn },
  }


  return (
    <FirebaseAppContext.Provider value={context}>
      {children}
    </FirebaseAppContext.Provider> 
  );
}