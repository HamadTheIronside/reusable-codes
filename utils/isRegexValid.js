export function isRegexValid(regex) {
  try {
    // eslint-disable-next-line no-new
    new RegExp(regex);
    return true;
  } catch {
    return false;
  }
}

