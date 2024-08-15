export default async function Sample() {
  const body = JSON.stringify({ name: 'John' });
  const res = await fetch('https://www.google.com', { method: 'POST', body });
  const data = await res.text();

  return <div>{data}</div>;
}
