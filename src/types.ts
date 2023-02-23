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

import { styles } from './ui/styles';
import { WithStyles } from '@material-ui/core';

export interface Transports {
  [TransportType.CONSOLE]: {
    enabled: boolean;
  };
  [TransportType.FETCH]: {
    enabled: boolean;
    url: string;
  };
}

export interface FaroConfiguration {
  transports: Transports;
}

export interface Settings {
  urlFilter: string;
  transports: Transports;
}

export class Storage {
  settings: Settings;
  isPermissionAlertDismissed: boolean;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(storage: { [key: string]: any }) {
    this.settings = storage.settings;
    this.isPermissionAlertDismissed = storage.isPermissionAlertDismissed;
  }
}

export interface PermissionManagerProps {
  permissions: chrome.permissions.Permissions;
  onTogglePermissions: (currentValue: boolean) => void;
  removingPermissionsFailed: boolean;
}

export interface PermissionAlertProps {
  permissions: chrome.permissions.Permissions;
  dismissed: boolean;
  onDismiss: () => void;
  onGrantPermission: () => void;
}

export interface TransportOptionProps {
  for: TransportType;
  isEnabled: boolean;
  onToggle: (exporter: TransportType) => void;
  onValueChange?: (
    name: TransportType.FETCH,
    newValue: string
  ) => void;
  exporterPackageUrl: string;
  placeholderValue?: PlaceholderValues;
  value?: string;
}

export interface SaveButtonProps {
  label: Labels;
  onClick: () => void;
}

export interface AppProps extends WithStyles<typeof styles> {
  permissions: chrome.permissions.Permissions;
  settings: Settings;
  isPermissionAlertDismissed: boolean;
  app: AppType;
  activeTab: chrome.tabs.Tab | undefined;
}

export interface AppState {
  settings: Settings;
  permissions: chrome.permissions.Permissions;
  isPermissionAlertDismissed: boolean;
  removingPermissionsFailed: boolean;
}

export enum AppType {
  OPTIONS = 'options',
  POPUP = 'popup',
}

export enum TransportType {
  CONSOLE = 'Console',
  FETCH = 'Fetch'
}

export enum InstrumentationType {
  DOCUMENT_LOAD = 'DocumentLoad',
  FETCH = 'Fetch',
  XML_HTTP_REQUEST = 'XMLHttpRequest',
}

export enum DomElements {
  CONFIG_TAG = 'grafana-faro-instrumentation',
}

export enum DomAttributes {
  CONFIG = 'config',
}

export enum PlaceholderValues {
  FETCH_URL = 'http://my-grafana-stack.grafana.net/collect'
}

export enum Labels {
  SAVE = 'Save',
  SAVE_AND_RELOAD = 'Save & Reload',
}

export enum TabStatus {
  UNLOADED = 'unloaded',
  LOADING = 'loading',
  COMPLETE = 'complete',
}

export const CONTENT_SCRIPT_NAME = 'contentScript.js';
export const INSTRUMENTATION_SCRIPT_NAME = 'instrumentation.js';
