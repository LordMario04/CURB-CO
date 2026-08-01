import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartItem = {
  id: number;
  brand: string;
  title: string;
  price: string;
  quantity: number;
};

type CartStore = {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (id: number) => void;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) => {
        const existing = get().items.find((i) => i.id === item.id);
        if (existing) {
          set({
            items: get().items.map((i) =>
              i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
            ),
          });
        } else {
          set({ items: [...get().items, { ...item, quantity: 1 }] });
        }
      },

      removeItem: (id) => {
        set({ items: get().items.filter((i) => i.id !== id) });
      },

      increaseQuantity: (id) => {
        set({
          items: get().items.map((i) =>
            i.id === id ? { ...i, quantity: i.quantity + 1 } : i
          ),
        });
      },

      decreaseQuantity: (id) => {
        set({
          items: get().items.map((i) =>
            i.id === id && i.quantity > 1
              ? { ...i, quantity: i.quantity - 1 }
              : i
          ),
        });
      },

      clearCart: () => set({ items: [] }),

      getTotalItems: () =>
        get().items.reduce((total, i) => total + i.quantity, 0),
    }),
    {
      name: "curb-co-cart",
    }
  )
);