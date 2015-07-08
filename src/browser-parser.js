function parseFirefox(userAgent) {
  const firefox = userAgent.match(/\bfirefox\/([\d\.]+)/i);
  if (!firefox) { return {}; }

  const version = firefox[1];
  return {
    name:    'Firefox',
    version: version,
    major:   parseInt(version.split('.')[0], 10)
  };
}

export function isFirefox(userAgent) {
  const result = parseFirefox(userAgent);
  return !!result.name;
}

export function firefoxInfo(userAgent) {
  return parseFirefox(userAgent);
}

function parseChrome(userAgent) {
  const chrome = userAgent.match(/\bchrome\/([\d\.]+)\s/i);
  if (!chrome) { return {}; }

  const version = chrome[1];
  return {
    name:    'Chrome',
    version: version,
    major:   parseInt(version.split('.')[0], 10)
  };
}

export function isChrome(userAgent) {
  const result = parseChrome(userAgent);
  return !!result.name;
}

export function chromeInfo(userAgent) {
  return parseChrome(userAgent);
}
