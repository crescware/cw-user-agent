export default class DeviceInfo {
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
   * @returns {cwua.BrowserInfo}
   */
  get browser() {
    return {};
  }

  /**
   * @returns {cwua.EngineInfo}
   */
  get engine() {
    return {};
  }

  /**
   * @returns {cwua.OsInfo}
   */
  get os() {
    return {};
  }

  /**
   * @returns {string}
   */
  get device() {
    return {};
  }
}
