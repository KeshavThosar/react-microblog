import { useState } from "react";
import { useFirebaseAppContext } from "../firebase-helper/hooks";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate, useParams } from "react-router-dom";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";

export default function BlogPostForm({ mode }) {
  const { auth, db } = useFirebaseAppContext();
  const { blogId } = useParams();

  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  onAuthStateChanged(auth, async (user) => {
    if (user) {
      if (mode == "edit") {
        const docRef = doc(db, "blogs", blogId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const { author_uid, title:_title , content: _content } = docSnap.data();
          if (author_uid != user.uid) {
            navigate("/");
          } else {
            if(title.trim().length == 0) {
              setTitle(_title);
            }

            if(content.trim().length == 0) {
              setContent(_content);
            }
          }
        } else {
          navigate("/not-found");
        }
      }
    } else {
      navigate("/login");
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!auth.currentUser) {
      navigate("/login");
    }

    const { uid: author_uid, displayName: author_name } = auth.currentUser;
    const published_on = serverTimestamp();

    if (mode == "create") {
      if (title.length > 0 && content.length > 0) {
        const docRef = await addDoc(collection(db, "blogs"), {
          author_name,
          author_uid,
          title,
          content,
          published_on,
        });
        navigate(`/blogs/${docRef.id}`);
      }
    } else if (mode == "edit") {
      const docRef = doc(db, "blogs", blogId);
      const prevBlogPost = await getDoc(docRef);
      if(prevBlogPost.exists()){
        await updateDoc(docRef, {
          title,
          content,
          published_on,
        });
        navigate(`/blogs/${blogId}`);
      }else{
        navigate("/");
      }

    }
  };

  const deletePost = async () => {
    if (!auth.currentUser) {
      navigate("/login");
    }

    if (confirm("Delete this blog post?")) {
      const docRef = doc(db, "blogs", blogId);
      await deleteDoc(docRef);
      navigate("/");
    }
  };

  return (
    <div className="mt-10">
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          {mode == "edit" ? "Update" : "Create"} Blog Post
        </h2>
        <div className="space-y-4">
          <form onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                placeholder={mode == "edit" ? title : "Enter post title"}
                defaultValue={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Content
              </label>
              <textarea
                rows="8"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
                placeholder={
                  mode == "edit" ? content : "Write your blog content here..."
                }
                defaultValue={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Publish Post
            </button>
          </form>
          {mode == "edit" && (
            <button
              className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-500 transition-colors"
              onClick={deletePost}
            >
              Delete Post
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
