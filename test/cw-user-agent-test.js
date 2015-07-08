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
 * @param {{
 *   desc: string,
 *   ua: string,
 *   browser: cwua.BrowserInfo,
 *   engine: cwua.EngineInfo,
 *   os: cwua.OsInfo,
 *   device: string
 * }} spec
 * @returns {void}
 */
function parameterize(spec) {
  describe(spec.desc, () => {
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

    it(`device is ${spec.device.type}`, () => {
      const info = parser.deviceInfo();
      assert.strictEqual(info.device.type, spec.device.type);
    });
  });
}

describe('Use cases', () => {
  describe('Mac Safari', () => {
    const specs = require('./devices/mac-safari');
    specs.forEach(spec => parameterize(spec));
  });

  describe('Mac Firefox', () => {
    const specs = require('./devices/mac-firefox');
    specs.forEach(spec => parameterize(spec));
  });

  describe('Windows Internet Explorer 6', () => {
    const specs = require('./devices/windows-ie6');
    specs.forEach(spec => parameterize(spec));
  });

  describe('Windows Internet Explorer 10', () => {
    const specs = require('./devices/windows-ie10');
    specs.forEach(spec => parameterize(spec));
  });

  describe('Windows Internet Explorer 11', () => {
    const specs = require('./devices/windows-ie11');
    specs.forEach(spec => parameterize(spec));
  });

  describe('Windows Firefox', () => {
    const specs = require('./devices/windows-firefox');
    specs.forEach(spec => parameterize(spec));
  });

  describe('Windows Chrome', () => {
    const specs = require('./devices/windows-chrome');
    specs.forEach(spec => parameterize(spec));
  });

  describe('iOS 8', () => {
    const specs = require('./devices/ios-8');
    specs.forEach(spec => parameterize(spec));
  });

  describe('Android 2.3 Gingerbread', () => {
    const specs = require('./devices/android-2-3-gingerbread');
    specs.forEach(spec => parameterize(spec));
  });

  describe('Android 4.0 Ice Cream Sandwich', () => {
    const specs = require('./devices/android-4-0-icecreamsandwich');
    specs.forEach(spec => parameterize(spec));
  });

  describe('Android 4.1 - 4.3 Jelly Bean', () => {
    const specs = require('./devices/android-4-1-jellybean');
    specs.forEach(spec => parameterize(spec));
  });

  describe('Android 4.4 KitKat', () => {
    const specs = require('./devices/android-4-4-kitkat');
    specs.forEach(spec => parameterize(spec));
  });

  describe('Android 5.0, 5.1 Lollipop', () => {
    const specs = require('./devices/android-5-0-lollipop');
    specs.forEach(spec => parameterize(spec));
  });
});

describe('ServicePack', () => {
  let parser;
  beforeEach(() => {
    parser = new Parser();
  });

  it('should be get SP2', () => {
    const ua = 'Mozilla/5.0 (Windows; U; MSIE 6.0; Windows NT 5.1; SV1; .NET CLR 2.0.50727)';
    parser.setUA(ua);
    const result = parser.deviceInfo();
    assert.strictEqual(result.servicePack, 'SP2');
  });
});
