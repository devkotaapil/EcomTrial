import { useParams, Link } from 'react-router-dom';
import blogsData from '../data/blogs.js';

const BlogDetails = () => {
  const { id } = useParams();
  const blog = blogsData.find(b => b.id === Number(id));
  if (!blog) return <div className="container mx-auto px-4 py-16">Blog not found.</div>;
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-16">
        <Link to="/blogs" className="text-blue-600 hover:underline mb-4 inline-block">← Back to Blogs</Link>
        <div className="bg-white rounded-lg shadow-md p-8">
          <img src={blog.image} alt={blog.title} className="w-full h-64 object-cover rounded mb-6" />
          <h1 className="text-3xl font-bold mb-2">{blog.title}</h1>
          <div className="flex gap-4 text-sm text-gray-500 mb-4">
            <span>{blog.author}</span>
            <span>{blog.date}</span>
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">{blog.tags.join(', ')}</span>
          </div>
          <p className="text-lg text-gray-700 mb-4">{blog.summary}</p>
          <div className="prose max-w-none text-gray-800">{blog.content}</div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
