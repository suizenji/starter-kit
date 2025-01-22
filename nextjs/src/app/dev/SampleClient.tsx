'use client';

import { useActionState } from 'react';
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
  const [state, formAction, isPending] = useActionState(increment, 0);

  const handleSendMail = () => {
    sendMail();
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
    </div>
  );
}
