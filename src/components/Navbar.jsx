import { useState } from "react";
import { Link } from "react-router-dom";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import { ShoppingCartIcon, HeartIcon } from "@heroicons/react/24/outline";
import { useCart } from "../contexts/CartContext.jsx";
import { useWishlist } from "../contexts/WishlistContext.jsx";
import AuthModal from "./AuthModal.jsx";
import { useAuthModal } from "../contexts/AuthModalContext.jsx";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthModalOpen, setIsAuthModalOpen, authMode, setAuthMode } =
    useAuthModal();
  const { getCartItemsCount } = useCart();
  const { wishlist } = useWishlist();

  const cartItemsCount = getCartItemsCount();
  const wishlistCount = wishlist.length;

  return (
    <nav className="bg-gray-800 text-white">
      <div className="container mx-auto flex justify-between items-center p-4">
        <Link to="/" className="text-xl font-bold">
          <span className="font-edu text-2xl text-red-500">S</span>ajilo
        </Link>
        <div className="hidden md:flex space-x-4 items-center">
          <Link
            to="/"
            className={({ isActive }) =>
              `${
                isActive
                  ? "border-b-3 transition-all border-red-500"
                  : "text-white"
              }`
            }
          >
            Home
          </Link>
          <Link
            to="/about"
            className={({ isActive }) =>
              `${
                isActive
                  ? "border-b-3 transition-all border-red-500"
                  : "text-white"
              }`
            }
          >
            About
          </Link>
          <Link
            to="/products"
            className={({ isActive }) =>
              `${
                isActive
                  ? "border-b-3 transition-all border-red-500"
                  : "text-white"
              }`
            }
          >
            Products
          </Link>
          <Link
            to="/blogs"
            className={({ isActive }) =>
              `${
                isActive
                  ? "border-b-3 transition-all border-red-500"
                  : "text-white"
              }`
            }
          >
            Blogs
          </Link>
          <Link
            to="/books"
            className={({ isActive }) =>
              `${
                isActive
                  ? "border-b-3 transition-all border-red-500"
                  : "text-white"
              }`
            }
          >
            Books
          </Link>
          <Link
            to="/contact"
            className={({ isActive }) =>
              `${
                isActive
                  ? "border-b-3 transition-all border-red-500"
                  : "text-white"
              }`
            }
          >
            Contact
          </Link>
          <Link
            to="/cart"
           className={({ isActive }) =>
              `${
                isActive
                  ? "border-b-3 transition-all border-red-500"
                  : "text-white"
              }`
            }
          >
            Cart
          </Link>
          <SignedOut>
            <button
              onClick={() => {
                setAuthMode("sign-in");
                setIsAuthModalOpen(true);
              }}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              LogIn
            </button>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden">
          <div className="flex flex-col space-y-2 p-4">
            <Link to="/" onClick={() => setIsOpen(false)}>
              Home
            </Link>
            <Link to="/about" onClick={() => setIsOpen(false)}>
              About
            </Link>
            <Link to="/products" onClick={() => setIsOpen(false)}>
              Products
            </Link>
            <Link to="/blogs" onClick={() => setIsOpen(false)}>
              Blogs
            </Link>
            <Link to="/books" onClick={() => setIsOpen(false)}>
              Books
            </Link>
            <Link to="/contact" onClick={() => setIsOpen(false)}>
              Contact
            </Link>
            <Link to="/cart" onClick={() => setIsOpen(false)}>
              Cart
            </Link>
            <SignedOut>
              <button
                onClick={() => {
                  setAuthMode("sign-in");
                  setIsAuthModalOpen(true);
                  setIsOpen(false);
                }}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Auth
              </button>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </div>
      )}
      {isAuthModalOpen && (
        <AuthModal
          authMode={authMode}
          setAuthMode={setAuthMode}
          onClose={() => setIsAuthModalOpen(false)}
        />
      )}
    </nav>
  );
};

export default Navbar;
