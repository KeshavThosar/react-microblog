import { onAuthStateChanged, signOut } from "firebase/auth";
import { useFirebaseAppContext } from "../firebase-helper/hooks";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const { auth } = useFirebaseAppContext();
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [uid, setUid] = useState("");

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUid(user.uid);
      setUserLoggedIn(true);
    } else {
      setUserLoggedIn(false);
    }
  });

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="text-xl font-bold text-gray-800">React Blog Site</div>
          <div className="flex space-x-6">
            <a href="/"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              Home
            </a>
            {userLoggedIn ? (
              <>
                <a
                  href="/blogs/new"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Create New
                </a>
                <a
                  href={`/?author=${uid}`}
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Your Posts
                </a>
                <a
                  href="/profile"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Profile
                </a>
                <a
                  href="#"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                  onClick={() => signOut(auth)}
                >
                  Log Out
                </a>
              </>
            ) : (
              <>
                <a
                  href="/login"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Login
                </a>
                <a
                  href="/register"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Register
                </a>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
