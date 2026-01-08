import { useEffect, useState } from "react";
import { useFirebaseAppContext } from "../firebase-helper/hooks";
import { collection, getDocs, query, where } from "firebase/firestore";
import BlogCard from "../components/BlogCard";

export default function HomePage(){
  const [blogs, setBlogs] = useState([]);
  const { db } = useFirebaseAppContext();
  const params = new URLSearchParams(document.location.search);
  const author_uid = params.get('author');
  
  useEffect(() => {

    async function getBlogs() {
      let q = undefined;
      
      if(!author_uid || author_uid.length == 0) { 
        q = query(collection(db, 'blogs'));
      }
      else { 
        q = query(collection(db, 'blogs'), where('author_uid', '==', author_uid));
      }

      const querySnapshot = await getDocs(q);
      setBlogs([]); // needed while using StrictMode in developement build
      querySnapshot.forEach((doc) => {
        setBlogs((blogs) => [...blogs, {id: doc.id, ...doc.data()}])
      });
    }
    getBlogs();
  }, [db, author_uid]);

  return (<div className="mt-10">
    {
    blogs.map((blog) => {
      return <div className="my-5" key={blog.id}>
        <BlogCard {...blog} />
      </div>
    })
     
    }
  </div>);
}