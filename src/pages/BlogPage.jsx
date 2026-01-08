import { useNavigate, useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useFirebaseAppContext } from "../firebase-helper/hooks";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

export default function BlogPage() {
  const { auth, db } = useFirebaseAppContext();
  const { blogId } = useParams();
  const [blog, setBlog] = useState(undefined);
  const [uid, setUid] = useState('');
  const navigate = useNavigate();

  onAuthStateChanged(auth, (user) => {
    if(user) {
      setUid(user.uid);
    }
  })

  useEffect(() => {
    async function getBlog(id) {
      const docRef = doc(db, 'blogs', id);
      const docSnap = await getDoc(docRef);
      if(docSnap.exists()) {
        setBlog(docSnap.data());
      } else {
        navigate('/not-found');
      }
    }
    getBlog(blogId);

  }, [db, blogId, navigate, setBlog]);


  return (
    <>
    {blog && <div className="mx-5 mt-5">
      <h3 className="text-xl text-center font-bold text-gray-800 mb-3">
        {blog.title }
      </h3>
      {(!!blog && blog.author_uid == uid) && <span className="underline"><Link to={`/blogs/${blogId}/edit`}>Edit Post</Link></span> }
      <div className="text-sm text-gray-500 mb-5">
        <p>Published On: {(new Date(blog.published_on.seconds * 1000)).toDateString()}</p>
        <p>Author: <Link to={`/?author=${blog.author_uid}`} className="underline">{blog.author_name}</Link></p>
      </div>
      <hr />
      <p className="my-5 text-gray-800 leading-relaxed">
        {blog.content}
      </p>
      <hr />
    </div>}
    </>
  );
}
