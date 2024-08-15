import { db } from './schema';
import { users } from './user';
export * from './schema';

export function seed() {
  users.forEach((user) => db.user.create(user));
}
