import type { IRequestConfig, UsePaginationOptions } from '../types';
import { watch } from 'vue-demi';
const getRequestBody = (config: IRequestConfig) => {
  const { method = 'get' } = config;
  if (method.toLowerCase() === 'get') {
    return config.params;
  }
  if (method.toLowerCase() === 'post') {
    return config.data;
  }
  return undefined;
};
/**
 * 分页请求
 * @param config
 * @param options
 */
export const usePagination = (config: IRequestConfig, options?: UsePaginationOptions) => {
  const requestBody = getRequestBody(config);
  const { watcher = [] } = options ?? ({} as UsePaginationOptions);
  if (requestBody) {
    watch(
      () => (watcher.length > 0 ? watcher.map(key => requestBody[key]) : requestBody),
      () => {
        console.log(requestBody);
      },
      {
        deep: true
      }
    );
  }
};
