import type { ReactNode, MouseEvent } from 'react';

export interface ButtonProps {
  onClick?: (e: MouseEvent) => void;
  children: ReactNode;
}

export function Button({ onClick, children }: ButtonProps) {
  return <button onClick={onClick}>{children}</button>;
}
