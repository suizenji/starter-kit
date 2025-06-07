import { createMeta } from '@/utils/meta';
import Login from './Login';

const title = 'ログイン';
export const metadata = createMeta({ title });

export default function Page() {
  return <Login />;
}
