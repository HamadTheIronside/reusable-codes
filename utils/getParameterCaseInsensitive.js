/**
 * @param {Object} object
 * @param {string} key
 * @return {any} value
 */
export function getParameterCaseInsensitive(object, key) {
  return object[Object.keys(object).find((k) => k.toLowerCase() === key.toLowerCase())];
}
