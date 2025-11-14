import { useParams, Link } from 'react-router-dom';
import booksData from '../data/books.js';

const BookDetails = () => {
  const { id } = useParams();
  const book = booksData.find(b => b.id === Number(id));
  if (!book) return <div className="container mx-auto px-4 py-16">Book not found.</div>;
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-16">
        <Link to="/books" className="text-blue-600 hover:underline mb-4 inline-block">← Back to Books</Link>
        <div className="bg-white rounded-lg shadow-md p-8">
          <img src={book.cover} alt={book.title} className="w-full h-64 object-cover rounded mb-6" />
          <h1 className="text-3xl font-bold mb-2">{book.title}</h1>
          <div className="flex gap-4 text-sm text-gray-500 mb-4">
            <span>{book.author}</span>
            <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded">{book.category}</span>
            <span>Rating: {book.rating} ★</span>
            <span>Stock: {book.stock}</span>
          </div>
          <p className="text-lg text-gray-700 mb-4">Rs. {book.price}</p>
          <div className="prose max-w-none text-gray-800">{book.description}</div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
