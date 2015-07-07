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
    version: string;
    major?: number;
    minor?: number;
    patch?: number;
  }

  interface EngineInfo {
    name: string;
    version: string;
  }
}

declare module 'cw-user-agent' {
  export = cwua;
}
