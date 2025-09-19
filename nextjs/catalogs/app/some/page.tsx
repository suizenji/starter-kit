import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { createMeta } from '@/utils/meta';
import Logic from './Logic';
import { getData } from '@/crud/facade';

const title = 'xxx';
export const metadata = createMeta({ title });

export default function Page() {
  return (
    <main>
      <h1 className="sr-only">{title}</h1>
      <ErrorBoundary fallback={<p>error</p>}>
        <Suspense fallback={<p>loading...</p>}>
          <Logic dataPromise={getData()} />
        </Suspense>
      </ErrorBoundary>
    </main>
  );
}
