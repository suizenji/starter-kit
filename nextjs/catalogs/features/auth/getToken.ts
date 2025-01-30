import { getSession } from './session';
import { validateTokenExp } from './oidc/service';

let _tokenPromise: Promise<string> | null = null;
let _cachedToken = '';

export async function getToken() {
  if (!_cachedToken) {
    const session = await getSession();
    return (_cachedToken = session?.accessToken ?? '');
  }

  if (!validateTokenExp(_cachedToken)) {
    if (!_tokenPromise) {
      _tokenPromise = getSession().then((session) => {
        return session?.accessToken ?? '';
      });

      _cachedToken = await _tokenPromise;
      _tokenPromise = null;

      return _cachedToken;
    } else {
      return await _tokenPromise;
    }
  }

  return _cachedToken;
}
