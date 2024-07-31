import type { App } from 'vue-demi';
import { type IRequestConfig, installHttp } from './packages/entry';
export * from './packages/entry';
export default {
  install(app: App, options?: IRequestConfig) {
    app.config.globalProperties.$http = installHttp(options);
  }
};
