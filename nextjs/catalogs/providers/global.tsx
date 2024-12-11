'use client';

import { createContext, useState, ReactNode } from 'react';
import type { Foo } from '@/types';

export interface IGlobalContext {
  foo?: Foo;
  setFoo: (foo: Foo) => void;
}

export const GlobalContext = createContext<IGlobalContext>({
  setFoo: () => console.warn('no global provider'),
});

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [foo, setFoo] = useState<Foo>();

  return (
    <GlobalContext.Provider
      value={{
        foo,
        setFoo,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

/*
// app.tsx
import { GlobalProvider } from './global';
<GlobalProvider>{children}</GlobalProvider>

// child.tsx
import { useContext } from 'react';
import { GlobalContext } from '@/providers/global';
const { foo } = useContext(GlobalContext);
*/
