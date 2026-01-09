import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter } from "react-router";
import { FirebaseAppContextProvider } from "./firebase-helper/context";
import { RouterProvider } from "react-router/dom";
import Navbar from "./components/Navbar.jsx";
import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import BlogPage from "./pages/BlogPage.jsx";
import ProfileSettings from "./components/ProfileSettings.jsx";
import BlogPostForm from "./components/BlogPostForm.jsx";


const router = createBrowserRouter([
  { path: '/', element: <HomePage />, errorElement: <NotFoundPage />},
  { path: '/login', element: <LoginPage action="login" />},
  { path: '/register', element: <LoginPage action="register" />},
  { path: '/profile', element: <ProfileSettings /> },
  { path: '/blogs/new', element: <BlogPostForm mode="create" /> },
  { path: '/blogs/:blogId', element: <BlogPage /> },
  { path: '/blogs/:blogId/edit', element: <BlogPostForm mode="edit" /> },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <FirebaseAppContextProvider>
      <Navbar />
      <div className="mx-10" >
        <RouterProvider router={router}/>
      </div>
    </FirebaseAppContextProvider>
  </StrictMode>
);
