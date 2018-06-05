export const IS_SSR = 'IS_SSR';

export const changeSSR = (value) => ({
  type: IS_SSR,
  payload: value,
});
