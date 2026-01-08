import { Link } from "react-router-dom";

export default function BlogCard({
  id,
  title,
  published_on,
  author_name,
  author_uid,
  content,
}) {
  const publishDate = new Date(published_on.seconds * 1000);
  return (
    <div className="max-w-md p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <h3 className="text-xl font-bold text-gray-800 mb-3">
        <Link to={`/blogs/${id}`}>{title}</Link>
      </h3>
      <div className="text-sm text-gray-500">
        <p>Published On: {publishDate.toDateString()}</p>
        <p>Author: <Link to={`/?author=${author_uid}`} className="underline">{author_name}</Link></p>
      </div>
      <p className="text-gray-800 leading-relaxed">
        {content.slice(0, 100)}...
      </p>
    </div>
  );
}
