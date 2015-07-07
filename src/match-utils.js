import re from './regexp';

/**
 * @param {RegExp} regex
 * @param {string} userAgent
 * @returns {boolean}
 */
export function match(regex, userAgent) {
  return regex.test(userAgent);
}

/**
 * @param {string} userAgent
 * @returns {boolean}
 */
export function isApple(userAgent) {
  return match(re.apple.phone, userAgent)
    || match(re.apple.tablet, userAgent)
    || match(re.apple.iPod, userAgent);
}

/**
 * @param {string} userAgent
 * @returns {boolean}
 */
export function isAndroid(userAgent) {
  return match(re.android.phone, userAgent)
    || match(re.android.tablet, userAgent);
}

/**
 * @param {string} userAgent
 * @returns {boolean}
 */
export function isWindows(userAgent) {
  return match(re.windows.pc, userAgent);
}
