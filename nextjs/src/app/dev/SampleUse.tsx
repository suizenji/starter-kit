'use client';

import { use } from 'react';

export default function Use({p}: {p: Promise<string>}) {
  const str = use(p);
  return <div>{`Use: ${str.slice(0, 20)}`}</div>;
}
