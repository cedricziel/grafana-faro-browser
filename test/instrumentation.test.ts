/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* eslint-disable node/no-unpublished-import */

import * as chromeMock from 'sinon-chrome';
import * as assert from 'assert';
import * as sinon from 'sinon';
import { FaroInstrumentation } from '../src/instrumentation/FaroInstrumentation';
import {
  TransportType,
  PlaceholderValues,
} from '../src/types';
import { JSDOM } from 'jsdom';
import { TEST_URL } from './utils';

describe('FaroInstrumentation', () => {
  let sandbox: sinon.SinonSandbox;
  let instrumentation : FaroInstrumentation;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    instrumentation = new FaroInstrumentation(
      {
        transports: {
          [TransportType.CONSOLE]: {
            enabled: true,
          },
          [TransportType.FETCH]: {
            enabled: true,
            url: PlaceholderValues.FETCH_URL,
          },
        },
      },
    );

    const { window } = new JSDOM('<!doctype html><html><body></body></html>', {
      url: TEST_URL,
    });

    global.window = window as any;
    global.XMLHttpRequest = window.XMLHttpRequest;
    global.document = window.document;
  });

  afterEach(async () => {
    sandbox.restore();
    chromeMock.reset();
  });

  it('adds transports to the instrumentation', () => {
    const addSpanProcessorSpy = sinon.spy(instrumentation.targetTransports, 'push');

    instrumentation.initialize();

    assert.ok(addSpanProcessorSpy.callCount === 2);
  });
});
