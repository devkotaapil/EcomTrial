const ProductCardSkeleton = () => {
  return (
    <div className="card p-4 animate-pulse">
      <div className="skeleton h-48 w-full mb-4"></div>
      <div className="skeleton h-4 w-3/4 mb-2"></div>
      <div className="skeleton h-4 w-1/2 mb-4"></div>
      <div className="skeleton h-10 w-full"></div>
    </div>
  );
};

const ProductGridSkeleton = ({ count = 8 }) => {
  return (
    <div className="product-grid">
      {Array.from({ length: count }, (_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  );
};

const CartItemSkeleton = () => {
  return (
    <div className="flex items-center space-x-4 p-4 border rounded-lg animate-pulse">
      <div className="skeleton h-16 w-16"></div>
      <div className="flex-1">
        <div className="skeleton h-4 w-3/4 mb-2"></div>
        <div className="skeleton h-4 w-1/2"></div>
      </div>
      <div className="skeleton h-8 w-20"></div>
    </div>
  );
};

export { ProductCardSkeleton, ProductGridSkeleton, CartItemSkeleton };
