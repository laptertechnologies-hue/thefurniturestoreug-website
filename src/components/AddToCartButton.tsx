"use client";

import { ShoppingBag } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useState } from "react";

interface AddToCartButtonProps {
  product: {
    id: string;
    name: string;
    price: number;
    discountPrice?: number | null;
    image?: string;
    category?: string;
  };
  quantity?: number;
  className?: string;
  showText?: boolean;
}

export default function AddToCartButton({ product, quantity = 1, className = "add-to-cart-btn", showText = false }: AddToCartButtonProps) {
  const addItem = useCartStore((state) => state.addItem);
  const [added, setAdded] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigating if wrapped in a Link
    
    addItem({
      id: product.id,
      name: product.name,
      price: product.discountPrice || product.price,
      quantity,
      image: product.image,
      category: product.category
    });

    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <button 
      className={className} 
      onClick={handleAdd}
      aria-label="Add to cart"
      style={{
        backgroundColor: added ? '#4caf50' : '',
        borderColor: added ? '#4caf50' : '',
        color: added ? 'white' : '',
        transition: 'all 0.3s ease'
      }}
    >
      <ShoppingBag size={18} />
      {showText && (
        <span style={{ marginLeft: '8px' }}>
          {added ? 'Added to Cart!' : 'Add to Cart'}
        </span>
      )}
    </button>
  );
}
