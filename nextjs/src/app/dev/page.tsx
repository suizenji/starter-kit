import type { Metadata } from 'next';
import SampleServer from './SampleServer';
import SampleClient from './SampleClient';

// https://nextjs.org/docs/app/building-your-application/optimizing/metadata
export const metadata: Metadata = {
  title: '...',
};

export default function Page() {
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
    </>
  );
}
