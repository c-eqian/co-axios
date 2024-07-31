import { IRequestConfig, IResponse } from '../types';
import { isFunction } from 'co-utils-vue';
import RequestHttp from '../interceptor';

export const handleResponse = async (response: any, axiosInstance: RequestHttp): Promise<any> => {
  const { config, data } = response as IResponse;
  axiosInstance?.axiosCanceler?.removePending(response.config);
  const { preResponse } = config as IRequestConfig;
  if (isFunction(preResponse)) {
    return preResponse(response);
  }
  return data;
};
