import type { Metadata } from 'next';
import { Suspense } from 'react';
import SampleServer from './SampleServer';
import SampleClient from './SampleClient';
import SampleUse from './SampleUse';

// https://nextjs.org/docs/app/building-your-application/optimizing/metadata
export const metadata: Metadata = {
  title: '...',
};

export default function Page() {
  const usePromise = fetch('https://www.google.com')
    .then((res) => {
      console.log('page: resolved');
      return res.text();
    });

  return (
    <>
      <div>
        <div>SampleServer</div>
        <SampleServer />
      </div>
      <div>
        <div>SampleClient</div>
        <SampleClient />
      </div>
      <div>
        <div>SampleUse</div>
        <Suspense fallback={<div>loading...</div>}>
          <SampleUse p={usePromise} />
        </Suspense>
      </div>
    </>
  );
}
