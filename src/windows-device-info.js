import re from './regexp';
import {device} from './constants';
import DeviceInfo from './device-info';
import {match} from './match-utils';

export default class WindowsDeviceInfo extends DeviceInfo {
  constructor(ua) {
    super(ua);
    this.initXPServicePack();
  }

  /**
   * @returns {void}
   */
  initXPServicePack() {
    if (this.os.version === '5.1'/* XP */) {
      const securityVer = this.ua.match(/\bwindows\snt\b\s.*?;\s(sv\d)?;?/i)[1];
      if (securityVer === 'SV1') {
        this.servicePack = 'SP2';
      }
    }
  }

  /**
   * @returns {cwua.BrowserInfo}
   */
  get browser() {
    const ie = this.ua.match(/msie\s([\d\.]+);/i);

    if (ie) {
      const version = ie[1];
      return {
        name:    'Internet Explorer',
        version: version,
        major:   parseInt(version.split('.')[0], 10)
      };
    }

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
    if (this.browser.name === 'Internet Explorer') {
      return {
        name: 'Trident'
      };
    }

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

    const osInfo = {
      name:    'Windows NT',
      version: ntVersion,
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
      if (match(re.windows.pc,  this.ua)) { return device.pc; }
    })();

    return {
      type: type
    };
  }
  /* eslint-enable no-multi-spaces, complexity */
}
