import { useContext, useEffect } from "react";
import { FirebaseAppContext } from "./config";
import { useNavigate } from "react-router";

export function useFirebaseAppContext() {
  return useContext(FirebaseAppContext);
}

export function useAuthenticatedRoute() {
  const navigate = useNavigate();
  const { user: { loggedIn } } = useFirebaseAppContext();

  useEffect(() => {
    const timeout = setTimeout(() => {
      if(!loggedIn) {
        navigate('/login');
      }
    }, 1500);

    return () => clearTimeout(timeout);
  }, [loggedIn, navigate])
}