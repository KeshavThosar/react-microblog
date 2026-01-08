export default function Sidenav(){
   return (
    <div className="w-64 bg-white h-screen shadow-lg">
      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Dashboard</h2>
        <nav className="space-y-2">
          <a href="#" className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-md transition-colors">
            Home
          </a>
          <a href="#" className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-md transition-colors">
            My Posts
          </a>
          <a href="#" className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-md transition-colors">
            Create Post
          </a>
          <a href="#" className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-md transition-colors">
            Analytics
          </a>
          <a href="#" className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-md transition-colors">
            Settings
          </a>
          <a href="#" className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-md transition-colors">
            Logout
          </a>
        </nav>
      </div>
    </div>
  );
};