import {isFirefox} from './browser-parser';

export function parseEngine(userAgent) {
  if (isFirefox(userAgent)) {
    const gecko = userAgent.match(/rv:([\d\.]+).*\sgecko/i);
    const engineInfo = {
      name: 'Gecko'
    };

    if (gecko) {
      engineInfo.version = gecko[1];
    }

    return engineInfo;
  }

  return {};
}
