const re = {
  apple: {
    iPod:   /iPod touch;/i,
    phone:  /iPhone;/i,
    tablet: /iPad;/i
  },
  android: {
    phone:  /(?=.*\bAndroid\b)(?=.*\bMobile\b)/i,
    tablet: /Android/i
  },
  windows: {
    phone:  /IEMobile/i,
    tablet: /(?=.*\bWindows\b)(?=.*\bARM\b)/i
  },
  blackberry:    /BlackBerry/i,
  blackberry10:  /BB10/i,
  operaMini:     /Opera Mini/i,
  firefoxMobile: /(?=.*\bFirefox\b)(?=.*\bMobile\b)/i
};

/**
 * @param {RegExp} regex
 * @param {string} userAgent
 * @returns {boolean}
 */
function match(regex, userAgent) {
  return regex.test(userAgent);
}

export default class Parser {
  constructor() {
    // noop
  }

  /**
   * @param {string} ua - user agent
   * @returns {void}
   */
  setUA(ua) {
    this.ua = ua;
  }

  /**
   * @returns {cwua.DeviceInfo}
   */
  deviceInfo() {
    return {
      userAgent: this.ua,
      device:    this.parseDevice()
    };
  }

  /* eslint-disable no-multi-spaces */
  /**
   * @returns {string}
   */
  parseDevice() {
    if (match(re.apple.phone,    this.ua)) { return 'iPhone'; }
    if (match(re.apple.tablet,   this.ua)) { return 'iPad'; }
    if (match(re.apple.iPod,     this.ua)) { return 'iPodTouch'; }
    if (match(re.android.phone,  this.ua)) { return 'phone'; }
    if (match(re.android.tablet, this.ua)) { return 'tablet'; }
  }
  /* eslint-enable no-multi-spaces */
}
