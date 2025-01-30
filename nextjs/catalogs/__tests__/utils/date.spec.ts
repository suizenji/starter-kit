import { getDate, setDate } from '@/utils/date';

test('date', () => {
  let date = getDate();
  expect(date.getFullYear()).toBe(new Date().getFullYear());
  expect(date.getMonth()).toBe(new Date().getMonth());

  setDate(new Date(2018, 2));
  date = getDate();
  expect(date.getFullYear()).toBe(2018);
  expect(date.getMonth()).toBe(2);

  setDate(null);
  date = getDate();
  expect(date.getFullYear()).toBe(new Date().getFullYear());
  expect(date.getMonth()).toBe(new Date().getMonth());
});
