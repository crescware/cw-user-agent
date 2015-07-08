import assert from 'assert';
import Parser from '../index';

describe('0.1.x does not support Windows Phone', () => {
  const ua = 'Mozilla/5.0 (compatible; MSIE 10.0; Windows Phone 8.0; Trident/6.0; IEMobile/10.0; ARM; Touch; HTC; Windows Phone 8X by HTC)';
  let info;
  beforeEach(() => {
    const parser = new Parser();
    parser.setUA(ua);
    info = parser.deviceInfo();
  });

  it('It does not throw an exception', () => {
    assert.strictEqual(info.userAgent, ua);
    assert.strictEqual(info.browser, void 0);
    assert.strictEqual(info.engine, void 0);
    assert.strictEqual(info.os, void 0);
    assert.strictEqual(info.device, void 0);
  });
});

describe('0.1.x does not support BlackBerry', () => {
  const ua = 'Mozilla/5.0 (BlackBerry; U; BlackBerry 9900; en) AppleWebKit/534.11+ (KHTML, like Gecko) Version/7.1.0.346 Mobile Safari/534.11+';
  let info;
  beforeEach(() => {
    const parser = new Parser();
    parser.setUA(ua);
    info = parser.deviceInfo();
  });

  it('It does not throw an exception', () => {
    assert.strictEqual(info.userAgent, ua);
    assert.strictEqual(info.browser, void 0);
    assert.strictEqual(info.engine, void 0);
    assert.strictEqual(info.os, void 0);
    assert.strictEqual(info.device, void 0);
  });
});

describe('0.1.x does not support Linux', () => {
  const ua = 'Mozilla/5.0 (X11; Linux i586; rv:31.0) Gecko/20100101 Firefox/31.0';
  let info;
  beforeEach(() => {
    const parser = new Parser();
    parser.setUA(ua);
    info = parser.deviceInfo();
  });

  it('It does not throw an exception', () => {
    assert.strictEqual(info.userAgent, ua);
    assert.strictEqual(info.browser, void 0);
    assert.strictEqual(info.engine, void 0);
    assert.strictEqual(info.os, void 0);
    assert.strictEqual(info.device, void 0);
  });
});
