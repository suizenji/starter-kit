'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Cart } from '@/features/Cart';
import type { Product } from '@/types';

// @see @/providers/cart
export function useCart() {
  const [cart, setCart] = useState<Cart | undefined>();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, update] = useState({});

  const { data: session } = useSession();
  const user = session?.user;

  useEffect(() => {
    if (!user) return;

    const id = session.user.tempoCode;
    if (cart?.id === id) return;

    const ReactiveCart = class extends Cart {
      save(productList: Product[]): void {
        super.save(productList);
        update({});
      }
    };

    setCart(new ReactiveCart(id, localStorage));
  }, [user]);

  return { cart };
}
