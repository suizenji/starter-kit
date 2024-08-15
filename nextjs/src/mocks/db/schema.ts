import { factory } from '@mswjs/data';
import { userModel } from './user';

export const db = factory({
  user: userModel,
});
