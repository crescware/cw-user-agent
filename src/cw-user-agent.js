const re = {
  apple: {
    phone:  /iPhone/i,
    iPod:   /iPod/i,
    tablet: /iPad/i
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
      userAgent: this.ua
    };
  }
}
