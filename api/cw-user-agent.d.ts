declare module cwua {
  class Parser {
    setUA(ua: string): void;
    deviceInfo(): DeviceInfo;
  }

  interface DeviceInfo {
    userAgent: string;
    device: string;
  }
}

declare module 'cw-user-agent' {
  export = cwua;
}
