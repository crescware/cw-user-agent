import re from './regexp';
import {device} from './constants';
import DeviceInfo from './device-info';
import {match} from './match-utils';
import {isFirefox, firefoxInfo} from './browser-parser';
import {parseEngine} from './engine-parser';

export default class AppleDeviceInfo extends DeviceInfo {
  constructor(ua) {
    super(ua);
  }

  /**
   * @returns {cwua.BrowserInfo}
   */
  get browser() {
    if (isFirefox(this.ua)) { return firefoxInfo(this.ua); }

    const version = this.ua.match(/\bAppleWebKit\/.*?Version\/([\d\.]+)\s/)[1];

    return {
      name:    'Mobile Safari',
      version: version,
      major:   parseInt(version.split('.')[0], 10)
    };
  }

  /**
   * @returns {cwua.EngineInfo}
   */
  get engine() {
    if (this.browser.name === 'Firefox') {
      return parseEngine(this.ua);
    }

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
    const macOsX = this.ua.match(/\bos\sx\s([\d\.]+);/i);
    if (macOsX) {
      const verArr = macOsX[1].split('.');
      const osInfo = {
        name:    'Mac OS X',
        version: verArr.join('.'),
        major:   parseInt(verArr[0], 10),
        minor:   parseInt(verArr[1], 10)
      };
      if (verArr[2] !== void 0 && verArr[2] !== null) {
        osInfo.patch = parseInt(verArr[2], 10);
      }
      return osInfo;
    }

    const raw = this.ua.match(/(?=\bCPU\b).+?\sOS\s(\d_\d(_\d)?)/)[1];
    const verArr = raw.split('_');

    const osInfo = {
      name:    'iOS',
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
    const type = (() => {
      if (match(re.apple.mac,    this.ua)) { return device.pc; }
      if (match(re.apple.phone,  this.ua)) { return device.mobile; }
      if (match(re.apple.tablet, this.ua)) { return device.tablet; }
      if (match(re.apple.iPod,   this.ua)) { return device.mobile; }
    })();

    return {
      type: type
    };
  }
  /* eslint-enable no-multi-spaces, complexity */
}
