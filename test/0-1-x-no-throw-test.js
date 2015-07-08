import assert from 'assert';
import Parser from '../index';

function parameterize(desc, ua) {
  describe(desc, () => {
    let info;
    beforeEach(() => {
      const parser = new Parser();
      parser.setUA(ua);
      info = parser.deviceInfo();
    });

    it('should be get userAgent', () => {
      assert.strictEqual(info.userAgent, ua);
    });

    describe('It does not throw an exception', () => {
      it('browser', () => {
        assert.deepEqual(info.browser, {});
      });

      it('engine', () => {
        assert.deepEqual(info.engine, {});
      });

      it('os', () => {
        assert.deepEqual(info.os, {});
        assert.strictEqual(info.os.name, void 0);
      });

      it('device', () => {
        assert.deepEqual(info.device, {});
      });
    });
  });
}

parameterize(
  '0.1.x does not support Windows Phone',
  'Mozilla/5.0 (compatible; MSIE 10.0; Windows Phone 8.0; Trident/6.0; IEMobile/10.0; ARM; Touch; HTC; Windows Phone 8X by HTC)'
);

parameterize(
  '0.1.x does not support Windows Phone',
  'Mozilla/5.0 (compatible; MSIE 10.0; Windows Phone 8.0; Trident/6.0; IEMobile/10.0; ARM; Touch; NOKIA; Lumia 520)'
);

parameterize(
  '0.1.x does not support BlackBerry',
  'Mozilla/5.0 (BlackBerry; U; BlackBerry 9900; en) AppleWebKit/534.11+ (KHTML, like Gecko) Version/7.1.0.346 Mobile Safari/534.11+'
);

parameterize(
  '0.1.x does not support Linux',
  'Mozilla/5.0 (X11; Linux i586; rv:31.0) Gecko/20100101 Firefox/31.0'
);
