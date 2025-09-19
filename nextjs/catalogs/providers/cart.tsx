'use client';

import { createContext, ReactNode } from 'react';
import { Cart } from '@/repositories/cart';
import { useCart } from '@/hooks/useCart';

export interface ICartContext {
  cart?: Cart;
}

export const CartContext = createContext<ICartContext>({});

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const { cart } = useCart();

  return (
    <CartContext.Provider
      value={{
        cart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
