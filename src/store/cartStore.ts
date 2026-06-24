import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  category?: string;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getSubtotal: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (newItem) => {
        set((state) => {
          const existingItemIndex = state.items.findIndex(item => item.id === newItem.id);
          
          if (existingItemIndex > -1) {
            // Update quantity if item already exists
            const updatedItems = [...state.items];
            updatedItems[existingItemIndex].quantity += newItem.quantity;
            return { items: updatedItems };
          }
          
          // Add new item if it doesn't exist
          return { items: [...state.items, newItem] };
        });
      },
      
      removeItem: (id) => {
        set((state) => ({
          items: state.items.filter(item => item.id !== id)
        }));
      },
      
      updateQuantity: (id, delta) => {
        set((state) => ({
          items: state.items.map(item => {
            if (item.id === id) {
              const newQuantity = Math.max(1, item.quantity + delta);
              return { ...item, quantity: newQuantity };
            }
            return item;
          })
        }));
      },
      
      clearCart: () => {
        set({ items: [] });
      },
      
      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },
      
      getSubtotal: () => {
        return get().items.reduce((total, item) => total + (item.price * item.quantity), 0);
      }
    }),
    {
      name: 'furniture-store-cart', // name of the item in the storage (must be unique)
    }
  )
);
