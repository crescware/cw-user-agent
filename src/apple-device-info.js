import re from './regexp';
import DeviceInfo from './device-info';
import {match} from './match-utils';

export default class AppleDeviceInfo extends DeviceInfo {
  constructor(ua) {
    super(ua);
  }

  /**
   * @returns {cwua.BrowserInfo}
   */
  get browser() {
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
    if (match(re.apple.phone,  this.ua)) { return 'iPhone'; }
    if (match(re.apple.tablet, this.ua)) { return 'iPad'; }
    if (match(re.apple.iPod,   this.ua)) { return 'iPodTouch'; }
  }
  /* eslint-enable no-multi-spaces, complexity */
}
