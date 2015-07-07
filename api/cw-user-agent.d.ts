declare module cwua {
  class Parser {
    setUA(ua: string): void;
    deviceInfo(): DeviceInfo;
  }

  interface DeviceInfo {
    userAgent: string;
    browser: BrowserInfo;
    engine: EngineInfo;
    os: OsInfo;
    device: string;
  }

  interface BrowserInfo {
    name: string;
    version: string;
    major: number;
  }

  interface EngineInfo {
    name: string;
    version: string;
  }

  interface OsInfo {
    name: string;
    version: string;
    major: number;
    minor?: number;
    patch?: number;
  }
}

declare module 'cw-user-agent' {
  export = cwua;
}
