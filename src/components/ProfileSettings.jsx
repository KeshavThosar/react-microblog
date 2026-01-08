import { useNavigate } from "react-router";
import { useFirebaseAppContext } from "../firebase-helper/hooks";
import { useEffect, useState } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  updateEmail,
  updatePassword,
  updateProfile,
} from "firebase/auth";

export default function ProfileSettings() {
  const { auth } = useFirebaseAppContext();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();
  
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setName(user.displayName);
        setEmail(user.email);
      } else {
        navigate("/");
      }
    });
  }, [auth, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const currentUser = auth.currentUser;
      
      await signInWithEmailAndPassword(auth, currentUser.email, confirmPassword);
      if (email.length > 0 && email != currentUser.email)
        await updateEmail(currentUser, email);
        await signInWithEmailAndPassword(auth, email, confirmPassword);
      if (name.length > 0 && name != currentUser.displayName)
        await updateProfile(currentUser, { displayName: name });
      if (password.length > 0) {
        await updatePassword(currentUser, password);
        await signInWithEmailAndPassword(auth, currentUser.email, password);
      }
      alert("Profile updated successfully");
      setShowLoginForm(false);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="mt-10 max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      {showLoginForm && (
        <>
        <p className="text-center mb-2">Re enter your current password to update your profile</p>
        <div className="absolute flex bg-white z-10 h-full left-0 w-full justify-center">
          <form className="w-100" onSubmit={handleSubmit}>
            <div>
              <input
                type="password"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                placeholder="Enter your password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className=" mt-2 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Continue
            </button>
            {error.length > 0 && (
            <p className="mt-2 w-full px-4 py-2 border border-red-600 text-red-900 rounded-md">
              {error}
            </p>
          )}
          </form>
        </div>
        </>
      )}
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Profile Settings
      </h2>
      <div className="space-y-4">
        <form onSubmit={(e) => {e.preventDefault(); setShowLoginForm(true); } }>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Name
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              placeholder={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              placeholder={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              placeholder="Enter new password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="mt-2 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Save Changes
          </button>
          {error.length > 0 && (
            <p className="mt-2 w-full px-4 py-2 border border-red-600 text-red-900 rounded-md">
              {error}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
