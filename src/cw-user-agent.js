import re from './regexp';
import DeviceInfo from './device-info';
import AppleDeviceInfo from './apple-device-info';
import {match, isApple, isAndroid, isWindows} from './match-utils';

class AndroidDeviceInfo extends DeviceInfo {
  constructor(ua) {
    super(ua);
  }

  /**
   * @returns {cwua.BrowserInfo}
   */
  get browser() {
    const androidBrowser = this.ua.match(/android.+version\/([\d\.]+)\s+(?:mobile\s?safari|safari)/i);

    if (androidBrowser) {
      const version = androidBrowser[1];
      return {
        name:    'Android Browser',
        version: version,
        major:   parseInt(version.split('.')[0], 10)
      };
    }

    const chrome = this.ua.match(/\bChrome\/([\d\.]+)\s/);

    return {
      name:    'Chrome',
      version: chrome[1],
      major:   parseInt(chrome[1].split('.')[0], 10)
    };
  }

  /**
   * @returns {cwua.EngineInfo}
   */
  get engine() {
    const version = this.ua.match(/\bAppleWebKit\/(\d+\.\d+(\.\d+)?)/)[1];

    return {
      name:    'WebKit',
      version: version
    };
  }

  /**
   * @returns {cwua.OsInfo}
   */
  get os() {
    const raw = this.ua.match(/\bAndroid\b\s(\d\.\d(\.\d)?);/)[1];
    const verArr = raw.split('.');

    const osInfo = {
      name:    'Android',
      version: verArr.join('.'),
      major:   parseInt(verArr[0], 10),
      minor:   parseInt(verArr[1], 10)
    };
    if (verArr[2] !== void 0 && verArr[2] !== null) {
      osInfo.patch = parseInt(verArr[2], 10);
    }

    return osInfo;
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
}

class WindowsDeviceInfo extends DeviceInfo {
  constructor(ua) {
    super(ua);
  }

  /**
   * @returns {cwua.BrowserInfo}
   */
  get browser() {
    const chrome = this.ua.match(/\bchrome\/([\d\.]+)\s/i);

    return {
      name:    'Chrome',
      version: chrome[1],
      major:   parseInt(chrome[1].split('.')[0], 10)
    };
  }

  /**
   * @returns {cwua.EngineInfo}
   */
  get engine() {
    const webkit = this.ua.match(/\bapplewebKit\/([\d\.]+)/i);

    return {
      name:    'WebKit',
      version: webkit[1]
    };
  }

  /**
   * @returns {cwua.OsInfo}
   */
  get os() {
    const raw = this.ua.match(/\bwindows\snt\b\s([\d\.]+)/i)[1];
    const verArr = raw.split('.');
    const ntVersion = verArr.join('.');

    let productVersion = '';
    if (ntVersion === '6.3') {
      productVersion = '8.1';
    }

    const osInfo = {
      name:    'Windows',
      version: productVersion,
      major:   parseInt(verArr[0], 10),
      minor:   parseInt(verArr[1], 10)
    };
    if (verArr[2] !== void 0 && verArr[2] !== null) {
      osInfo.patch = parseInt(verArr[2], 10);
    }

    return osInfo;
  }

  /**
   * @returns {string}
   */
  /* eslint-disable no-multi-spaces, complexity */
  get device() {
    if (match(re.windows.pc,  this.ua)) { return 'pc'; }
  }
  /* eslint-enable no-multi-spaces, complexity */
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
    if (isWindows(this.ua)) {
      return new WindowsDeviceInfo(this.ua);
    }
    return new DeviceInfo(this.ua);
  }
}
