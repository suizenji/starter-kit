'use client';

import { useState, useActionState, useTransition } from 'react';
import { Button } from '@/components/Button';
import { sendMail } from './actions';

async function increment(previous: number, formData: FormData) {
  return new Promise<number>((resolve) => {
    setTimeout(() => {
      resolve(previous + 1);
    }, 1000);
  });
}

export default function Sample() {
  const [tranNum, setTranNum] = useState(0);
  const [isPendingTran, startTransition] = useTransition();

  const [state, formAction, isPending] = useActionState(increment, 0);

  const handleSendMail = () => {
    sendMail();
  };

  const handleTran = async () => {
    startTransition(async () => {
      console.log('tran');

      await new Promise((resolve) => {
        setTimeout(() => {
          resolve(1);
        }, 1000);
      });

      setTranNum(tranNum + 1);
    });
  };

  return (
    <div>
      <div>
        <Button onClick={handleSendMail}>server action</Button>
      </div>
      <div>
        <form>
          <button formAction={formAction}>form action</button>
          {isPending ? 'isPending...' : state}
        </form>
      </div>
      <div>
        <Button onClick={handleTran}>tran: {isPendingTran ? 'isPenging' : tranNum}</Button>
      </div>
    </div>
  );
}
