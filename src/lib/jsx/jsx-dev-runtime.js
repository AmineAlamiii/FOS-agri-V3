import { jsxDEV as reactJsxDEV, Fragment } from 'react/jsx-dev-runtime';
import { transformProps } from './transform.js';

export { Fragment };
export const jsxDEV = (type, props, key, isStatic, source, self) =>
  reactJsxDEV(type, transformProps(type, props), key, isStatic, source, self);
