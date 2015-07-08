import re from './regexp';
import {device} from './constants';
import DeviceInfo from './device-info';
import {match} from './match-utils';
import {isFirefox, firefoxInfo, isChrome, chromeInfo} from './browser-parser';
import {parseEngine} from './engine-parser';

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
    if (isFirefox(this.ua)) { return firefoxInfo(this.ua); }
    if (isChrome(this.ua)) { return chromeInfo(this.ua); }

    const ie = this.ua.match(/msie\s([\d\.]+);/i);
    if (ie) {
      const version = ie[1];
      return {
        name:    'Internet Explorer',
        version: version,
        major:   parseInt(version.split('.')[0], 10)
      };
    }

    const ie11 = this.ua.match(/trident.+rv[:\s]([\d\.]+).+like\sgecko/i);
    if (ie11) {
      const version = ie11[1];
      return {
        name:    'Internet Explorer',
        version: version,
        major:   parseInt(version.split('.')[0], 10)
      };
    }

    return {};
  }

  /**
   * @returns {cwua.EngineInfo}
   */
  get engine() {
    if (this.browser.name === 'Internet Explorer') {
      const trident = this.ua.match(/\btrident\/([\d\.]+)/i);
      const engineInfo = {
        name: 'Trident'
      };

      if (trident) {
        engineInfo.version = trident[1];
      }

      return engineInfo;
    }

    if (this.browser.name === 'Firefox') {
      return parseEngine(this.ua);
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
  get device() {
    /* eslint-disable no-multi-spaces, complexity */
    const type = (() => {
      if (match(re.windows.pc,  this.ua)) { return device.pc; }
    })();
    /* eslint-enable no-multi-spaces, complexity */

    return {
      type: type
    };
  }
}
