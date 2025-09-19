'use client';

import { use, useActionState, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { someAction } from './actions';
import View from './View';

export interface LogicProps {
  dataPromise: Promise<any>;
}

export default function Logic({ dataPromise }: LogicProps) {
  const router = useRouter();
  const data = use(dataPromise);

  const [formState, formAction, isPending] = useActionState(someAction, {});

  useEffect(() => {
    if (formState.result) router.refresh();
  }, [formState.timestamp, formState.result, router]);

  return <View />;
}
