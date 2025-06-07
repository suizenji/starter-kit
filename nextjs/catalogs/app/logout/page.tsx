import { createMeta } from '@/utils/meta';
import Logout from './Logout';

const title = 'ログアウト';
export const metadata = createMeta({ title });

export default function Page() {
  return <Logout />;
}
