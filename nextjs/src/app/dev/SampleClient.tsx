'use client';

import { useState, useEffect } from 'react';
import { useFormState } from 'react-dom';
import { Button } from '@/components/Button';
import { googleRepository } from '@/repositories';
import { sendMail } from './actions';

export default function Sample() {
  const [data, setData] = useState('');
  const [formState, formAction] = useFormState(sendMail, 0);

  useEffect(() => {
    googleRepository
      .find()
      .then((res) => JSON.stringify(res))
      .then((data) => {
        setData(data);
      })
      .catch((err) => {
        // CORS error
        setData(err.message);
      });
  }, []);

  const handleSendMail = () => {
    sendMail();
  };

  return (
    <div>
      <div>{data}</div>
      <div>
        <Button onClick={handleSendMail}>server action</Button>
      </div>
      <div>
        <form action={formAction}>
          <button>random value: {formState}</button>
        </form>
      </div>
    </div>
  );
}
