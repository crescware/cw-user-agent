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

/**
 * @param {string} userAgent
 * @returns {boolean}
 */
function isApple(userAgent) {
  return match(re.apple.phone, userAgent)
    || match(re.apple.tablet, userAgent)
    || match(re.apple.iPod, userAgent);
}

/**
 * @param {string} userAgent
 * @returns {boolean}
 */
function isAndroid(userAgent) {
  return match(re.android.phone, userAgent)
    || match(re.android.tablet, userAgent);
}

class DeviceInfo {
  /**
   * @constructor
   * @param {string} ua - user agent
   */
  constructor(ua) {
    this.ua = ua;
  }

  /**
   * @returns {string}
   */
  get userAgent() {
    return this.ua;
  }

  /**
   * @returns {string}
   */
  get device() {
    // abstract
  }

  /**
   * @returns {cwus.OsInfo}
   */
  get os() {
    // abstract
  }
}

class AppleDeviceInfo extends DeviceInfo {
  constructor(ua) {
    super(ua);
  }

  /**
   * @returns {string}
   */
  /* eslint-disable no-multi-spaces, complexity */
  get device() {
    if (match(re.apple.phone,  this.ua)) { return 'iPhone'; }
    if (match(re.apple.tablet, this.ua)) { return 'iPad'; }
    if (match(re.apple.iPod,   this.ua)) { return 'iPodTouch'; }
  }
  /* eslint-enable no-multi-spaces, complexity */

  /**
   * @returns {cwus.OsInfo}
   */
  get os() {
    const raw = this.ua.match(/(?=\bCPU\b).+?\sOS\s(\d_\d(_\d){0,1})/)[1];
    const verArr = raw.split('_');

    const osInfo = {
      name:  'iOS',
      full:  verArr.join('.'),
      major: parseInt(verArr[0], 10),
      minor: parseInt(verArr[1], 10)
    };
    if (verArr[2] !== void 0 && verArr[2] !== null) {
      osInfo.patch = parseInt(verArr[2], 10);
    }

    return osInfo;
  }
}

class AndroidDeviceInfo extends DeviceInfo {
  constructor(ua) {
    super(ua);
  }

  /**
   * @returns {string}
   */
  /* eslint-disable no-multi-spaces, complexity */
  get device() {
    if (match(re.android.phone,  this.ua)) { return 'phone'; }
    if (match(re.android.tablet, this.ua)) { return 'tablet'; }
  }
  /* eslint-enable no-multi-spaces, complexity */

  /**
   * @returns {cwus.OsInfo}
   */
  get os() {
    return {
      name: 'Android'
    };
  }
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
    if (isApple(this.ua)) {
      return new AppleDeviceInfo(this.ua);
    }
    if (isAndroid(this.ua)) {
      return new AndroidDeviceInfo(this.ua);
    }
    return new DeviceInfo(this.ua);
  }
}
