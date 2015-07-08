const re = {
  apple: {
    mac:    /macintosh;/i,
    iPod:   /iPod touch;/i,
    phone:  /iPhone;/i,
    tablet: /iPad;/i
  },
  android: {
    phone:  /(?=.*\bAndroid\b)(?=.*\bMobile\b)/i,
    tablet: /Android/i
  },
  windows: {
    pc:     /Windows\sNT/i,
    phone:  /IEMobile/i,
    tablet: /(?=.*\bWindows\b)(?=.*\bARM\b)/i
  },
  blackberry:    /BlackBerry/i,
  blackberry10:  /BB10/i,
  operaMini:     /Opera Mini/i,
  firefoxMobile: /(?=.*\bFirefox\b)(?=.*\bMobile\b)/i
};

module.exports = re;
