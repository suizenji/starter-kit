import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import SampleClient from '@/app/dev/SampleClient';
import SampleServer from '@/app/dev/SampleServer';

describe('fetch test sample', () => {
  test('GET', async () => {
    const res = await fetch('https://www.google.com');
    expect(res.status).toBe(200);
  });

  test('POST', async () => {
    const body = JSON.stringify({ a: 1 });
    const res = await fetch('https://www.google.com', { method: 'post', body });
    expect(res.status).toBeGreaterThan(1);
  });
});

/* // TODO: component
describe('component rendering sample', () => {
  test('SampleClient', async () => {
    const user = userEvent.setup()

    render(<SampleClient />);
    const msg = await screen.findByText(/[:alpha:]/);
    expect(msg).toBeInTheDocument();

    expect(screen.getByText('0')).toBeInTheDocument();
    await user.click(screen.getByRole('button'));
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  test('SampleServer', async () => {
    const rendered = await SampleServer();
    expect(rendered.props.children.length).toBeGreaterThan(1);
  });
});
*/

/* // TODO: prisma
import { prisma } from '@/lib/prisma';
import { Prisma, User } from '@prisma/client';
type UserInput = Prisma.UserCreateInput;

test('prisma', async () => {
  const email = (new Date()).toString();

  const user: UserInput = { email };
  await prisma.user.create({ data: user });

  const users = await prisma.user.findMany();
  const newUser: User = users.slice(-1)[0];
  expect(newUser.email).toBe(user.email);
});
*/
