import { useState } from 'react';
import { useCart } from '../contexts/CartContext.jsx';
import { useWishlist } from '../contexts/WishlistContext.jsx';
import { Link } from 'react-router-dom';
import { HeartIcon, ShoppingCartIcon, EyeIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';

const ProductCard = ({ product }) => {
  const { addToCart, isInCart, isLoading } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [imageLoading, setImageLoading] = useState(true);
  const [addingToCart, setAddingToCart] = useState(false);

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setAddingToCart(true);
    await addToCart(product);
    setTimeout(() => setAddingToCart(false), 500);
  };

  const handleToggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  const inWishlist = isInWishlist(product.id);
  const inCart = isInCart(product.id);

  return (
    <div className="card group relative overflow-hidden animate-fadeIn">
      {/* Wishlist Button */}
      <button
        onClick={handleToggleWishlist}
        className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-all duration-200 shadow-sm"
      >
        {inWishlist ? (
          <HeartSolidIcon className="h-5 w-5 text-red-500" />
        ) : (
          <HeartIcon className="h-5 w-5 text-gray-600 hover:text-red-500" />
        )}
      </button>

      <Link to={`/product/${product.id}`} className="block">
        {/* Product Image */}
        <div className="relative overflow-hidden rounded-t-xl">
          {imageLoading && (
            <div className="absolute inset-0 skeleton h-48"></div>
          )}
          <img
            src={product.image}
            alt={product.name}
            className={`w-full h-48 object-cover transition-all duration-300 group-hover:scale-105 ${
              imageLoading ? 'opacity-0' : 'opacity-100'
            }`}
            onLoad={() => setImageLoading(false)}
            onError={() => setImageLoading(false)}
          />
          
          {/* Quick View Overlay */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="flex space-x-2">
              <button className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors">
                <EyeIcon className="h-5 w-5 text-gray-700" />
              </button>
            </div>
          </div>
        </div>

        {/* Product Info */}
        <div className="p-4">
          <h3 className="font-semibold text-gray-900 line-clamp-2 mb-2 group-hover:text-blue-600 transition-colors">
            {product.name}
          </h3>
          
          <div className="flex items-center justify-between mb-3">
            <span className="text-xl font-bold text-blue-600">
              Rs {(product.price * 140).toFixed(0)}
            </span>
            {inCart && (
              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                In Cart
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="space-y-2">
            <button
              onClick={handleAddToCart}
              disabled={addingToCart || isLoading}
              className={`w-full btn-primary flex items-center justify-center space-x-2 ${
                addingToCart ? 'opacity-75 cursor-not-allowed' : ''
              }`}
            >
              {addingToCart ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Adding...</span>
                </>
              ) : (
                <>
                  <ShoppingCartIcon className="h-4 w-4" />
                  <span>{inCart ? 'Add More' : 'Add to Cart'}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;