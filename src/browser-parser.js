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
