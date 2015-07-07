import re from './regexp';
import DeviceInfo from './device-info';
import AppleDeviceInfo from './apple-device-info';
import AndroidDeviceInfo from './android-device-info';
import WindowsDeviceInfo from './windows-device-info';
import {isApple, isAndroid, isWindows} from './match-utils';

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
