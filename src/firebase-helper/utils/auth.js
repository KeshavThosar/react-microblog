
import { auth } from "../utils";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile
} from "firebase/auth";

export const login = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
}

export const register = (name, email, password) => {
  return createUserWithEmailAndPassword(auth, email, password).then(
    (userCredential) => updateProfile(userCredential.user, { displayName: name })
  );
}