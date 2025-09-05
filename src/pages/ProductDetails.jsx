
import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext.jsx';
import { useAuthModal } from '../contexts/AuthModalContext.jsx';
import { useUser } from '@clerk/clerk-react';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { setIsAuthModalOpen, setAuthMode } = useAuthModal();
  const { isSignedIn } = useUser();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    // Clear previous state to prevent stale data
    setProduct(null);
    setRelatedProducts([]);
    setError(null);
    setLoading(true);

    console.log('Fetching product with ID:', id); // Debug: Log the ID

    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://dummyjson.com/products/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch product details');
        }
        const data = await response.json();
        console.log('Product data:', data); // Debug: Log API response
        const formattedProduct = {
          id: data.id,
          name: data.title,
          description: data.description,
          price: data.price,
          image: data.thumbnail,
          images: data.images,
          category: data.category,
          brand: data.brand,
          rating: data.rating,
          stock: data.stock,
        };
        setProduct(formattedProduct);

        // Fetch related products based on category
        const relatedResponse = await fetch(
          `https://dummyjson.com/products/category/${data.category}?limit=4`
        );
        if (!relatedResponse.ok) {
          throw new Error('Failed to fetch related products');
        }
        const relatedData = await relatedResponse.json();
        console.log('Related products data:', relatedData); // Debug: Log related products
        const formattedRelated = relatedData.products
          .filter((item) => item.id !== data.id)
          .map((item) => ({
            id: item.id,
            name: item.title,
            price: item.price,
            image: item.thumbnail,
          }));
        setRelatedProducts(formattedRelated);

        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!isSignedIn) {
      setAuthMode('sign-in');
      setIsAuthModalOpen(true);
      return;
    }
    console.log('Adding to cart:', product, 'Quantity:', quantity); // Debug: Log cart action
    addToCart({ ...product, quantity });
    navigate('/cart');
  };

  if (loading) return <p className="text-center text-lg text-gray-700">Loading product details...</p>;
  if (error) return <p className="text-center text-lg text-red-500">Error: {error}</p>;
  if (!product) return <p className="text-center text-lg text-gray-700">Product not found.</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">{product.name}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-96 object-contain rounded-lg mb-4 border"
          />
          <div className="grid grid-cols-4 gap-2">
            {product.images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`${product.name} ${index + 1}`}
                className="w-full h-24 object-contain rounded border cursor-pointer hover:opacity-80"
              />
            ))}
          </div>
        </div>
        <div className="flex flex-col justify-between">
          <div>
            <p className="text-2xl font-semibold text-red-600 mb-2">Rs {(product.price.toFixed(1))*140}</p>
            <p className="text-gray-700 mb-4">{product.description}</p>
            <p className="text-gray-600 mb-2">Category: <span className="capitalize">{product.category}</span></p>
            <p className="text-gray-600 mb-2">Brand: {product.brand || 'N/A'}</p>
            <p className="text-gray-600 mb-2">Rating: {product.rating} / 5</p>
            <p className="text-gray-600 mb-4">
              Stock: {product.stock > 0 ? `${product.stock} available` : 'Out of stock'}
            </p>
            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Quantity:</label>
              <select
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="border border-gray-300 p-2 rounded w-20"
                disabled={product.stock === 0}
              >
                {[...Array(Math.min(product.stock, 10))].map((_, i) => (
                  <option key={i + 1} value={i + 1}>{i + 1}</option>
                ))}
              </select>
            </div>
          </div>
          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className={`w-full py-3 rounded text-white ${
              product.stock === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
            }`}
          >
            {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
          </button>
        </div>
      </div>
      {relatedProducts.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {relatedProducts.map((related) => (
              <Link
                key={related.id}
                to={`/product/${related.id}`}
                className="border rounded-lg p-4 shadow hover:shadow-lg transition flex flex-col h-[400px] justify-between"
              >
                <div className="flex flex-col flex-grow">
                  <img
                    src={related.image}
                    alt={related.name}
                    className="w-full h-48 object-contain mb-2 rounded"
                  />
                  <h2 className="text-xl font-semibold line-clamp-2">{related.name}</h2>
                  <p className="text-gray-600 mb-2">${related.price.toFixed(2)}</p>
                </div>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    addToCart(related);
                  }}
                  className="bg-blue-500 text-white px-4 py-2 rounded w-full hover:bg-blue-600"
                >
                  Add to Cart
                </button>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;