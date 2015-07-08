import re from './regexp';
import {device} from './constants';
import DeviceInfo from './device-info';
import {match} from './match-utils';

export default class AndroidDeviceInfo extends DeviceInfo {
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
  get device() {
    /* eslint-disable no-multi-spaces, complexity */
    const type = (() => {
      if (match(re.android.phone,  this.ua)) { return device.mobile; }
      if (match(re.android.tablet, this.ua)) { return device.tablet; }
    })();
    /* eslint-enable no-multi-spaces, complexity */

    return {
      type: type
    };
  }
}
