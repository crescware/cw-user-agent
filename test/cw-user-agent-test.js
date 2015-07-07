import assert from 'assert';
import Parser from '../index';

describe('Parser', () => {
  let parser;
  beforeEach(() => {
    parser = new Parser();
  });

  describe('setUA()', () => {
    it('should be set the user agent', () => {
      const ua = 'Dummy';
      parser.setUA(ua);
      assert.strictEqual(parser.ua, ua);
    });
  });

  describe('deviceInfo()', () => {
    it('should be get the object', () => {
      const ua = 'Dummy';
      parser.setUA(ua);
      const result = parser.deviceInfo();
      assert.strictEqual(result.userAgent, ua);
    });
  });
});

/**
 * @param {string} desc
 * @param {{
 *   ua: string,
 *   browser: cwua.BrowserInfo,
 *   engine: cwua.EngineInfo,
 *   os: cwua.OsInfo,
 *   device: string
 * }} spec
 * @returns {void}
 */
function parameterize(desc, spec) {
  describe(desc, () => {
    let parser;
    beforeEach(() => {
      parser = new Parser();
      parser.setUA(spec.ua);
    });

    it(`browser is ${spec.browser.name} ${spec.browser.version}`, () => {
      const info = parser.deviceInfo();
      assert.strictEqual(info.browser.name, spec.browser.name);
      assert.strictEqual(info.browser.version, spec.browser.version);
      assert.strictEqual(info.browser.major, spec.browser.major);
    });

    it(`engine is ${spec.engine.name} ${spec.engine.version}`, () => {
      const info = parser.deviceInfo();
      assert.strictEqual(info.engine.name, spec.engine.name);
      assert.strictEqual(info.engine.version, spec.engine.version);
    });

    it(`os version is ${spec.os.name} ${spec.os.version}`, () => {
      const info = parser.deviceInfo();
      assert.strictEqual(info.os.name, spec.os.name);
      assert.strictEqual(info.os.version, spec.os.version);
      assert.strictEqual(info.os.major, spec.os.major);
      assert.strictEqual(info.os.minor, spec.os.minor);
      assert.strictEqual(info.os.patch, spec.os.patch);
    });

    it(`device is ${spec.device}`, () => {
      const info = parser.deviceInfo();
      assert.strictEqual(info.device, spec.device);
    });
  });
}

describe('Use case', () => {
  parameterize('iPhone iOS 8.0', {
    ua:      'Mozilla/5.0 (iPhone; CPU iPhone OS 8_0 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) Version/8.0 Mobile/12A365 Safari/600.1.4',
    browser: {name: 'Mobile Safari', version: '8.0', major: 8},
    engine:  {name: 'WebKit', version: '600.1.4'},
    os:      {name: 'iOS', version: '8.0', major: 8, minor: 0, patch: void 0},
    device:  'iPhone'
  });

  parameterize('iPad iOS 8.0', {
    ua:      'Mozilla/5.0 (iPad; CPU OS 8_0 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) Version/8.0 Mobile/12A365 Safari/600.1.4',
    browser: {name: 'Mobile Safari', version: '8.0', major: 8},
    engine:  {name: 'WebKit', version: '600.1.4'},
    os:      {name: 'iOS', version: '8.0', major: 8, minor: 0, patch: void 0},
    device:  'iPad'
  });

  parameterize('iPod touch iOS 8.0', {
    ua:      'Mozilla/5.0 (iPod touch; CPU iPhone OS 8_0 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) Version/8.0 Mobile/12A365 Safari/600.1.4',
    browser: {name: 'Mobile Safari', version: '8.0', major: 8},
    os:      {name: 'iOS', version: '8.0', major: 8, minor: 0, patch: void 0},
    engine:  {name: 'WebKit', version: '600.1.4'},
    device:  'iPodTouch'
  });

  parameterize('Xperia Z4 SOV31', {
    ua:      'Mozilla/5.0 (Linux; Android 5.0.2; SOV31 Build/28.0.D.0.404) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/40.0.2214.89 Mobile Safari/537.36',
    browser: {name: 'Chrome', version: '40.0.2214.89', major: 40},
    engine:  {name: 'WebKit', version: '537.36'},
    os:      {name: 'Android', version: '5.0.2', major: 5, minor: 0, patch: 2},
    device:  'phone'
  });

  parameterize('Xperia Z4 Tablet SOT31', {
    ua:      'Mozilla/5.0 (Linux; Android 5.0.2; SOT31 Build/xxxx) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/40.0.2214.89 Safari/537.36',
    browser: {name: 'Chrome', version: '40.0.2214.89', major: 40},
    engine:  {name: 'WebKit', version: '537.36'},
    os:      {name: 'Android', version: '5.0.2', major: 5, minor: 0, patch: 2},
    device:  'tablet'
  });

  parameterize('Xperia Z4 SOV31', {
    ua:      'Mozilla/5.0 (Linux; Android 5.0.2; SOV31 Build/28.0.D.0.404) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/40.0.2214.89 Mobile Safari/537.36',
    browser: {name: 'Chrome', version: '40.0.2214.89', major: 40},
    engine:  {name: 'WebKit', version: '537.36'},
    os:      {name: 'Android', version: '5.0.2', major: 5, minor: 0, patch: 2},
    device:  'phone'
  });

  parameterize('URBANO V02', {
    ua:      'Mozilla/5.0 (Linux; Android 5.1; KYV34 Build/xxxx) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.93 Mobile Safari/537.36',
    browser: {name: 'Chrome', version: '39.0.2171.93', major: 39},
    engine:  {name: 'WebKit', version: '537.36'},
    os:      {name: 'Android', version: '5.1', major: 5, minor: 1, patch: void 0},
    device:  'phone'
  });

  parameterize('INFOBAR A03', {
    ua:      'Mozilla/5.0 (Linux; Android 4.4.4; KYV33 Build/100.0.2a10) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/36.0.1985.135 Mobile Safari/537.36',
    browser: {name: 'Chrome', version: '36.0.1985.135', major: 36},
    engine:  {name: 'WebKit', version: '537.36'},
    os:      {name: 'Android', version: '4.4.4', major: 4, minor: 4, patch: 4},
    device:  'phone'
  });

  parameterize('INFOBAR A03', {
    ua:      'Mozilla/5.0 (Linux; U; Android 2.3.4; ja-jp; IS11T Build/FGK400) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1',
    browser: {name: 'Android Browser', version: '4.0', major: 4},
    engine:  {name: 'WebKit', version: '533.1'},
    os:      {name: 'Android', version: '2.3.4', major: 2, minor: 3, patch: 4},
    device:  'phone'
  });
});
