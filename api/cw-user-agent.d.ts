declare module cwua {
  class Parser {
    setUA(ua: string): void;
    deviceInfo(): DeviceInfo;
  }

  interface DeviceInfo {
    userAgent: string;
    device: string;
    os: OsInfo;
    engine: EngineInfo;
    browser: BrowserInfo;
  }

  interface OsInfo {
    name: string;
    version: string;
    major: number;
    minor?: number;
    patch?: number;
  }

  interface EngineInfo {
    name: string;
    version: string;
  }

  interface BrowserInfo {
    name: string;
    version: string;
    major: number;
  }
}

declare module 'cw-user-agent' {
  export = cwua;
}
