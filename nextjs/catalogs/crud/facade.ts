import 'server-only';

import { withObject } from './policy';

export const getUser = withObject(({ dbUser, sessionUser }) => ({
  dbUser,
  sessionUser,
}));
