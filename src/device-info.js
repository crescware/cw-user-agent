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
   // abstract
  }

  /**
   * @returns {cwua.EngineInfo}
   */
  get engine() {
   // abstract
  }

  /**
   * @returns {cwua.OsInfo}
   */
  get os() {
    // abstract
  }

  /**
   * @returns {string}
   */
  get device() {
    // abstract
  }
}
