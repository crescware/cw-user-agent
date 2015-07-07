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
 * @param {string} specName
 * @param {{
 *   ua: string,
 *   device: string,
 *   os: cwua.OsInfo
 * }} spec
 * @returns {void}
 */
function parameterize(specName, spec) {
  describe(specName, () => {
    let parser;
    beforeEach(() => {
      parser = new Parser();
      parser.setUA(spec.ua);
    });

    it(`device is ${spec.device}`, () => {
      const info = parser.deviceInfo();
      assert.strictEqual(info.device, spec.device);
    });

    it(`os.name is ${spec.os.name}`, () => {
      const info = parser.deviceInfo();
      assert.strictEqual(info.os.name, spec.os.name);
    });

    it(`os version is ${spec.os.version}`, () => {
      const info = parser.deviceInfo();
      assert.strictEqual(info.os.version, spec.os.version);
      assert.strictEqual(info.os.major, spec.os.major);
      assert.strictEqual(info.os.minor, spec.os.minor);
      assert.strictEqual(info.os.patch, spec.os.patch);
    });
  });
}

describe('Use case', () => {
  parameterize('iPhone iOS 8.0', {
    ua:     'Mozilla/5.0 (iPhone; CPU iPhone OS 8_0 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) Version/8.0 Mobile/12A365 Safari/600.1.4',
    device: 'iPhone',
    os:     {
      name:    'iOS',
      version: '8.0',
      major:   8,
      minor:   0,
      patch:   void 0
    }
  });

  parameterize('iPad iOS 8.0', {
    ua:     'Mozilla/5.0 (iPad; CPU OS 8_0 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) Version/8.0 Mobile/12A365 Safari/600.1.4',
    device: 'iPad',
    os:     {
      name:    'iOS',
      version: '8.0',
      major:   8,
      minor:   0,
      patch:   void 0
    }
  });

  parameterize('iPod touch iOS 8.0', {
    ua:     'Mozilla/5.0 (iPod touch; CPU iPhone OS 8_0 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) Version/8.0 Mobile/12A365 Safari/600.1.4',
    device: 'iPodTouch',
    os:     {
      name:  'iOS',
      version:  '8.0',
      major: 8,
      minor: 0,
      patch: void 0
    }
  });

  parameterize('Xperia Z4 SOV31 / Browser', {
    ua:     'Mozilla/5.0 (Linux; Android 5.0.2; SOV31 Build/28.0.D.0.404) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/40.0.2214.89 Mobile Safari/537.36',
    device: 'phone',
    os:     {
      name:    'Android',
      version: '5.0.2',
      major:   5,
      minor:   0,
      patch:   2
    }
  });

  parameterize('Xperia Z4 Tablet SOT31 / Browser', {
    ua:     'Mozilla/5.0 (Linux; Android 5.0.2; SOT31 Build/xxxx) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/40.0.2214.89 Safari/537.36',
    device: 'tablet',
    os:     {
      name:    'Android',
      version: '5.0.2',
      major:   5,
      minor:   0,
      patch:   2
    }
  });
});
