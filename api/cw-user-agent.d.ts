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
    device: DeviceDetailInfo;
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

  interface DeviceDetailInfo {
    type: string;
    developer?: string; // not supported in 0.1.x
    name?: string; // not supported in 0.1.x
  }
}

declare module 'cw-user-agent' {
  export = cwua;
}
