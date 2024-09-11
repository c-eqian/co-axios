import { baseConfig } from '../axiosDefaultConfig';
import { tansParams } from './tansParams';
import { IRequestConfig } from '../types';
import { isArray, isBoolean, isFunction, useMerge } from '@eqian/utils-vue';
import RequestHttp from '../interceptor';
import { removeEmptyValues } from './emptyValues';

const handleEmpty = (config: IRequestConfig) => {
  if (config.method && config.method.toLocaleLowerCase() === 'post') {
    const { isFilterEmpty } = config as IRequestConfig;
    if (isBoolean(isFilterEmpty) && isFilterEmpty) {
      config.data = removeEmptyValues(config.data ?? {});
      return config;
    }
    if (isArray(isFilterEmpty)) {
      config.data = removeEmptyValues(config.data ?? {}, isFilterEmpty);
      return config;
    }
  }

  return config;
};
export const handleRequest = (config: any, axiosInstance: RequestHttp): any => {
  const { baseURL, url, withTimestamp, preRequest } = config as IRequestConfig;
  // 处理完整的 URL. 非 http, https 的才处理
  const isExternal = url && /^(https?:)/.test(url);
  if (!isExternal) {
    config.url = `${baseURL}${url?.replace(/^\//, '')}`;
  }
  const newConfig: IRequestConfig = {
    ...baseConfig,
    ...config
  };

  if (isBoolean(withTimestamp) && withTimestamp) {
    if (newConfig.method && newConfig.method.toLocaleLowerCase() === 'get') {
      newConfig.params = {
        ...newConfig.params,
        _t: Date.parse(`${new Date()}`) / 1000
      };
    } else if (newConfig.method && newConfig.method.toLocaleLowerCase() === 'post') {
      newConfig.data = {
        ...newConfig.data,
        _t: Date.parse(`${new Date()}`) / 1000
      };
    }
  }
  if (newConfig.method && newConfig.method.toLocaleLowerCase() === 'get') {
    newConfig.params = {
      ...newConfig.params
    };
    newConfig.url = `${newConfig.url}?${tansParams(newConfig.params)}`.slice(0, -1);
    newConfig.params = {};
  }
  if (isFunction(preRequest)) {
    const _config = preRequest(newConfig);
    if (_config) {
      const conf = useMerge(newConfig, _config);
      axiosInstance?.axiosCanceler?.addPending(conf);
      return handleEmpty(conf);
    }
  }
  axiosInstance?.axiosCanceler?.addPending(newConfig);
  return handleEmpty(newConfig);
};
