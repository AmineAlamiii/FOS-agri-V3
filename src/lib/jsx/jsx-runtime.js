// Runtime JSX du projet : React standard + isolation des nombres en arabe.
import { jsx as reactJsx, jsxs as reactJsxs, Fragment } from 'react/jsx-runtime';
import { transformProps } from './transform.js';

export { Fragment };
export const jsx = (type, props, key) => reactJsx(type, transformProps(type, props), key);
export const jsxs = (type, props, key) => reactJsxs(type, transformProps(type, props), key);
