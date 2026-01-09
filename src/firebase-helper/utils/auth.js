
import { auth } from "../config";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut
} from "firebase/auth";

export const login = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
}

export const registerUser = (name, email, password) => {
  return createUserWithEmailAndPassword(auth, email, password).then(
    (userCredential) => updateProfile(userCredential.user, { displayName: name })
  );
}

export const logout = () => {
  return signOut(auth);
}
