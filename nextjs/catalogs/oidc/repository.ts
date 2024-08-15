const CLIENT_ID = '';
const CLIENT_SECRET = '';

export async function getMeta(uri: string) {
  const res = await fetch(uri, { next: { revalidate: 60 } });
  return res.json();
}

export async function getJWKs(uri: string) {
  const res = await fetch(uri, { next: { revalidate: 60 } });
  return res.json();
}

export async function refresh(uri: string, refreshToken: string) {
  const body = `grant_type=refresh_token&refresh_token=${refreshToken}`;

  const basicBase64 = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString(
    'base64',
  );
  const headers = {
    Authorization: `Basic ${basicBase64}`,
    'Content-Type': 'application/x-www-form-urlencoded',
  };

  const res = await fetch(uri, {
    method: 'post',
    body,
    headers,
  });

  return res.json();
}
