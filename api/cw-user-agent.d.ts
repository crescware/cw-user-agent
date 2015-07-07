declare module cwua {
  class Parser {
    setUA(ua: string): void;
    deviceInfo(): DeviceInfo;
  }

  interface DeviceInfo {
    userAgent: string;
    device: string;
    os: OsInfo;
  }

  interface OsInfo {
    name: string;
    full: string;
    major?: number;
    minor?: number;
    patch?: number;
  }
}

declare module 'cw-user-agent' {
  export = cwua;
}
