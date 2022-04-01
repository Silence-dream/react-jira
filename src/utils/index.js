// 让0也为true
export const isFalsy = (value) => (value === 0 ? false : !value);
export const cleanObject = (obj) => {
  let result = { ...obj };
  Object.keys(result).forEach((item) => {
    const value = result[item];
    if (isFalsy(value)) {
      delete result[item];
    }
  });
  return result;
};
