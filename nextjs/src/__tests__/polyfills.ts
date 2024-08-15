import 'cross-fetch/polyfill';

// https://mswjs.io/docs/migrations/1.x-to-2.x/#frequent-issues
const { TextDecoder, TextEncoder, ReadableStream } = require('node:util');

Object.defineProperties(globalThis, {
  TextDecoder: { value: TextDecoder },
  TextEncoder: { value: TextEncoder },
  ReadableStream: { value: ReadableStream },
});
