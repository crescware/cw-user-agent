import assert from 'assert';
import Parser from '../index';
const parser = new Parser();

describe('Parser', () => {
  describe('setUA', () => {
    it('should be set the user agent', () => {
      const ua = 'Dummy';
      parser.setUA(ua);
      assert.equal(parser.ua, ua);
    });
  });
});
