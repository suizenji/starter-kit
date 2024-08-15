import IdTokenVerifier from 'idtoken-verifier';
import { getMeta, getJWKs, refresh } from './repository';

const CLIENT_ID = '';

// @see https://openid-foundation-japan.github.io/openid-connect-core-1_0.ja.html#IDTokenValidation
export async function validateTokens(
  metaUri: string,
  idToken: string,
  accessToken: string,
): Promise<boolean> {
  const meta = await getMeta(metaUri);

  const jwksUri = meta.jwks_uri;
  const issuer = meta.issuer;
  const idTokenIsValid = await validateIDToken(idToken, jwksUri, issuer);
  if (!idTokenIsValid) {
    return false;
  }

  const decoded = IdTokenVerifier.prototype.decode(idToken);
  const atHash = decoded.payload.at_hash;
  const accessTokenIsValid = await validateAccessToken(accessToken, atHash);
  if (!accessTokenIsValid) {
    return false;
  }

  return true;
}

export async function validateIDToken(
  idToken: string,
  jwksUri: string,
  issuer: string,
): Promise<boolean> {
  const decoded = IdTokenVerifier.prototype.decode(idToken);
  const kid = decoded.header.kid;
  const jwksCache = createJWKsCache(jwksUri, kid);

  const verifier = new IdTokenVerifier({
    issuer: issuer,
    audience: CLIENT_ID,
    jwksCache: jwksCache,
  });

  const error = await new Promise((resolve) => {
    verifier.verify(idToken, (error, payload) => {
      resolve(error);
    });
  });

  if (error) {
    // logger.warn(error);
  }

  return !error;
}

export function createJWKsCache(uri: string, kid: string) {
  return {
    async get() {
      const {
        process,
      } = require('@/node_modules/idtoken-verifier/src/helpers/jwks');

      const jwks = await getJWKs(uri);
      const jwk = jwks.keys.find((key: any) => key.kid === kid);

      const processed = process(jwk);

      return processed;
    },
    set() {},
    has() {
      return true;
    },
  };
}

export function validateTokenExp(idToken: string) {
  const decoded = IdTokenVerifier.prototype.decode(idToken);
  const exp = decoded.payload.exp;

  const expTimeDate = new Date(0);
  expTimeDate.setUTCSeconds(exp);

  // NOTE: 日付を固定できると検証やテストで便利。
  const now = new Date();

  return now < expTimeDate;
}

export async function validateAccessToken(
  accessToken: string,
  atHash: string,
): Promise<boolean> {
  const verifier = new IdTokenVerifier({
    issuer: 'dummy',
    audience: CLIENT_ID,
  });

  const decoded = verifier.decode(accessToken);
  const alg = decoded.header.alg;

  const accessTokenIsValid = verifier.validateAccessToken(
    accessToken,
    alg,
    atHash,
    (error) => {
      // if (error) logger.warn(error);
      return !error;
    },
  );

  return accessTokenIsValid;
}

export async function refreshTokens(metaUri: string, refreshToken: string) {
  const meta = await getMeta(metaUri);
  return refresh(meta.token_endpoint, refreshToken);
}
