import { FaroConfiguration, Transports, TransportType } from "../types";
import {
  initializeFaro,
  getWebInstrumentations,
  Transport,
  ConsoleTransport,
  FetchTransport,
  LogLevel,
} from "@grafana/faro-web-sdk";
import { TracingInstrumentation } from "@grafana/faro-web-tracing";

export class FaroInstrumentation {
  transports: Transports;
  targetTransports: Transport[];

  constructor(config: FaroConfiguration) {
    this.transports = config.transports;
    this.targetTransports = [];
  }

  initialize() {
    if (this.transports[TransportType.CONSOLE].enabled) {
      this.targetTransports.push(
        new ConsoleTransport({
          // Optional, if you want to print the messages using console.debug instead of console.log
          level: LogLevel.DEBUG,
        })
      );
    }

    if (this.transports[TransportType.FETCH].enabled) {
      this.targetTransports.push(
        new FetchTransport({
          url: this.transports[TransportType.FETCH].url,
        })
      );
    }

    initializeFaro({
      app: {
        name: "Test",
        version: "1.0.0",
        environment: "production",
      },
      instrumentations: [
        ...getWebInstrumentations(),
        new TracingInstrumentation(),
      ],
      isolate: true,
      transports: this.targetTransports,
    });
  }
}
