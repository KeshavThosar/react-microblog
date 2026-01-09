import { useFirebaseAppContext } from "../firebase-helper/hooks";

export default function Navbar() {
  const { user, auth: { logout } } = useFirebaseAppContext();

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
            {user.loggedIn ? (
              <>
                <a
                  href="/blogs/new"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Create New
                </a>
                <a
                  href={`/?author=${user.uid}`}
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
                  onClick={() => logout()}
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
