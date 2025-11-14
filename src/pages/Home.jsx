import { useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard.jsx';
import productsData from '../data/products.js';
import blogsData from '../data/blogs.js';
import booksData from '../data/books.js';

const Home = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Welcome to Sajilo</h1>
          <p className="text-xl mb-8">Discover amazing products, inspiring blogs, and valuable books</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link to="/products" className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100">
              Shop Products
            </Link>
            <Link to="/blogs" className="border-2 border-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600">
              Read Blogs
            </Link>
            <Link to="/books" className="border-2 border-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600">
              Explore Books
            </Link>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Featured Products</h2>
          <p className="text-gray-600 mb-6">Discover our curated collection of {productsData.length} premium products</p>
          <div className="product-grid mb-8">
            {productsData.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center">
            <Link to="/products" className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700">
              View All Products →
            </Link>
          </div>
        </div>
      </div>

      {/* Blogs Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Latest Blogs</h2>
            <p className="text-gray-600 mb-6">Read our {blogsData.length} insightful articles on various topics</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              {blogsData.map((blog) => (
                <Link to={`/blog/${blog.id}`} key={blog.id} className="block">
                  <div
                    onMouseEnter={() => setHoveredCard(`blog-${blog.id}`)}
                    onMouseLeave={() => setHoveredCard(null)}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition transform hover:scale-105"
                  >
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-full h-40 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 mb-2">{blog.title}</h3>
                      <p className="text-xs text-gray-600 mb-2 line-clamp-2">{blog.summary}</p>
                      <div className="flex justify-between items-center text-xs text-gray-500">
                        <span>{blog.date}</span>
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                          {blog.tags[0]}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <div className="text-center">
            <Link to="/blogs" className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700">
              View All Blogs →
            </Link>
          </div>
        </div>
      </div>

      {/* Books Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Recommended Books</h2>
          <p className="text-gray-600 mb-6">Explore our collection of {booksData.length} carefully selected books</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {booksData.map((book) => (
              <Link to={`/book/${book.id}`} key={book.id} className="block">
                <div
                  onMouseEnter={() => setHoveredCard(`book-${book.id}`)}
                  onMouseLeave={() => setHoveredCard(null)}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition transform hover:scale-105"
                >
                  <img
                    src={book.cover}
                    alt={book.title}
                    className="w-full h-56 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 mb-1">{book.title}</h3>
                    <p className="text-xs text-gray-600 mb-2">{book.author}</p>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-lg font-bold text-blue-600">Rs. {book.price}</span>
                      <span className="flex items-center text-xs">
                        <span className="text-yellow-400">★</span>
                        {book.rating}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">{book.category}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div className="text-center">
          <Link to="/books" className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700">
            View All Books →
          </Link>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-blue-600 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <h3 className="text-4xl font-bold mb-2">{productsData.length}</h3>
              <p className="text-lg">Premium Products</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold mb-2">{blogsData.length}</h3>
              <p className="text-lg">Inspiring Blogs</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold mb-2">{booksData.length}</h3>
              <p className="text-lg">Valuable Books</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-100 py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Start Your Journey</h2>
          <p className="text-gray-600 mb-8 text-lg">Explore all {productsData.length + blogsData.length + booksData.length} items across our platform</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link to="/products" className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700">
              Browse Products
            </Link>
            <Link to="/blogs" className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700">
              Read Articles
            </Link>
            <Link to="/books" className="bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-700">
              Get Books
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;