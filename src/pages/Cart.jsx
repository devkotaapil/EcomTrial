import { useState } from 'react';
import { useCart } from '../contexts/CartContext.jsx';
import { useAuthModal } from '../contexts/AuthModalContext.jsx';
import { ShoppingBagIcon, TrashIcon } from '@heroicons/react/24/outline';
import CartItem from '../components/CartItem.jsx';

const Cart = ({ isSignedIn }) => {
  const { cart, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();
  const { setIsAuthModalOpen, setAuthMode } = useAuthModal();
  const [showSummary, setShowSummary] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const total = getCartTotal();

  if (!isSignedIn) {
    return (
      <div className="container mx-auto p-4 flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-6 text-center">Your Cart</h1>
        <p className="text-lg text-gray-700 mb-4">You have to login first to use the cart.</p>
        <button
          onClick={() => {
            setAuthMode('sign-in');
            setIsAuthModalOpen(true);
          }}
          className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600"
        >
          LogIn
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Your Cart</h1>
      {cart.length === 0 ? (
        <p className="text-center text-lg text-gray-700">Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-4">
            {cart.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                removeFromCart={removeFromCart}
                updateQuantity={updateQuantity}
              />
            ))}
          </div>
          <div className="mt-6 flex justify-between items-center">
            <p className="text-xl font-bold">Total: Rs {(total.toFixed(1))*140}</p>
            <button
              onClick={() => setShowSummary(true)}
              className="bg-green-500 text-white px-6 py-3 rounded hover:bg-green-600"
            >
              Checkout
            </button>
          </div>
          {showSummary && (
            <div className="mt-8 border border-gray-300 p-6 rounded-lg bg-gray-50">
              <h2 className="text-2xl font-bold mb-4">Order Bill Summary</h2>
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between mb-2 text-lg">
                  <span>{item.name} x {item.quantity}</span>
                  <span>Rs {((item.price * item.quantity).toFixed(1))*140}</span>
                </div>
              ))}
              <div className="flex justify-between font-bold mt-4 text-xl">
                <span>Total</span>
                <span>Rs {(total.toFixed(1))*140}</span>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Cart;