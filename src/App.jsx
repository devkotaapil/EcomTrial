import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './contexts/CartContext.jsx';
import { WishlistProvider } from './contexts/WishlistContext.jsx';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import Cart from './pages/Cart.jsx';
import Privacy from './pages/Privacy.jsx';
import Products from './pages/Products.jsx';
import Blogs from './pages/Blogs.jsx';
import Books from './pages/Books.jsx';
import BlogDetails from './pages/BlogDetails.jsx';
import BookDetails from './pages/BookDetails.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import ProductDetails from './pages/ProductDetails.jsx';

function App() {
  return (
    <WishlistProvider>
      <CartProvider>
        <Router>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/products" element={<Products />} />
                <Route path="/blogs" element={<Blogs />} />
                <Route path="/books" element={<Books />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route path="/blog/:id" element={<BlogDetails />} />
                <Route path="/book/:id" element={<BookDetails />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </CartProvider>
    </WishlistProvider>
  );
}

export default App;