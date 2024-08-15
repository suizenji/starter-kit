import { primaryKey } from '@mswjs/data';

export const userModel = {
  id: primaryKey(String),
  name: String,
};

export const users = [
  {
    id: '1',
    name: 'John Doe',
  },
  {
    id: '2',
    name: 'Jane Doe',
  },
];
