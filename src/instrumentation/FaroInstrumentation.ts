import { FaroConfiguration, Transports, TransportType } from "../types";
import {
  initializeFaro,
  getWebInstrumentations,
  ConsoleTransport,
  FetchTransport,
  LogLevel,
} from "@grafana/faro-web-sdk";
import { TracingInstrumentation } from '@grafana/faro-web-tracing';

export class FaroInstrumentation {
  transports: Transports;

  constructor(config: FaroConfiguration) {
    this.transports = config.transports;
  }

  initialize() {
    const transports = [];

    if (this.transports[TransportType.CONSOLE].enabled) {
      transports.push(
        new ConsoleTransport({
          // Optional, if you want to print the messages using console.debug instead of console.log
          level: LogLevel.DEBUG,
        })
      );
    }

    if (this.transports[TransportType.FETCH].enabled) {
        transports.push(
          new FetchTransport({
            url: this.transports[TransportType.FETCH].url
          })
        );
      }

    initializeFaro({
      app: {
        name: "Test",
        version: "1.0.0",
        environment: "production",
      },
      instrumentations: [...getWebInstrumentations(), new TracingInstrumentation()],
      isolate: true,
      transports: transports,
    });
  }
}
