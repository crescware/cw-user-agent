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
      assert.equal(parser.ua, ua);
    });
  });

  describe('deviceInfo()', () => {
    it('should be get the object', () => {
      const ua = 'Dummy';
      parser.setUA(ua);
      const result = parser.deviceInfo();
      assert.equal(result.userAgent, ua);
    });
  });
});

describe('Use case', () => {
  describe('iPhone iOS 8.0', () => {
    let parser;
    beforeEach(() => {
      parser = new Parser();
      parser.setUA('Mozilla/5.0 (iPhone; CPU iPhone OS 8_0 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) Version/8.0 Mobile/12A365 Safari/600.1.4');
    });

    it('device is iPhone', () => {
      const info = parser.deviceInfo();
      assert.equal(info.device, 'iPhone');
    });
  });

  describe('iPad iOS 8.0', () => {
    let parser;
    beforeEach(() => {
      parser = new Parser();
      parser.setUA('Mozilla/5.0 (iPad; CPU OS 8_0 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) Version/8.0 Mobile/12A365 Safari/600.1.4');
    });

    it('device is iPad', () => {
      const info = parser.deviceInfo();
      assert.equal(info.device, 'iPad');
    });
  });

  describe('iPod touch iOS 8.0', () => {
    let parser;
    beforeEach(() => {
      parser = new Parser();
      parser.setUA('Mozilla/5.0 (iPod touch; CPU iPhone OS 8_0 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) Version/8.0 Mobile/12A365 Safari/600.1.4');
    });

    it('device is iPod touch', () => {
      const info = parser.deviceInfo();
      assert.equal(info.device, 'iPodTouch');
    });
  });

  describe('Xperia Z4 SOV31 / Browser', () => {
    let parser;
    beforeEach(() => {
      parser = new Parser();
      parser.setUA('Mozilla/5.0 (Linux; Android 5.0.2; SOV31 Build/28.0.D.0.404) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/40.0.2214.89 Mobile Safari/537.36');
    });

    it('device is phone', () => {
      const info = parser.deviceInfo();
      assert.equal(info.device, 'phone');
    });
  });

  describe('Xperia Z4 Tablet SOT31 / Browser', () => {
    let parser;
    beforeEach(() => {
      parser = new Parser();
      parser.setUA('Mozilla/5.0 (Linux; Android 5.0.2; SOT31 Build/xxxx) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/40.0.2214.89 Safari/537.36');
    });

    it('device is tablet', () => {
      const info = parser.deviceInfo();
      assert.equal(info.device, 'tablet');
    });
  });
});
