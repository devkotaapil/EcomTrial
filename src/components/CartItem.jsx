// src/components/CartItem.jsx
const CartItem = ({ item, removeFromCart, updateQuantity }) => {
  return (
    <div className="flex items-center justify-between border-b py-4">
      <div className="flex-grow">
        <h3 className="text-lg font-semibold">{item.name}</h3>
        <p className="text-gray-600">${item.price.toFixed(2)} each</p>
      </div>
      <div className="flex items-center space-x-2">
        <button
          onClick={() => updateQuantity(item.id, item.quantity - 1)}
          className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
        >
          -
        </button>
        <span className="mx-2">{item.quantity}</span>
        <button
          onClick={() => updateQuantity(item.id, item.quantity + 1)}
          className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
        >
          +
        </button>
        <button
          onClick={() => removeFromCart(item.id)}
          className="bg-red-500 text-white px-3 py-1 rounded ml-4 hover:bg-red-600"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;