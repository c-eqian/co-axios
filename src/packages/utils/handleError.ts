import axios, { AxiosError } from 'axios';
import { IRequestConfig } from '../types';
import { isFunction } from '@eqian/utils-vue';
import RequestHttp from '../interceptor';

export const handleRequestError = (err: Error | undefined) => {
  // 请求报错
  Promise.reject(err);
};
export const handleResponseError = (error: AxiosError, axiosInstance: RequestHttp) => {
  const { config } = error;
  if (!config) return Promise.reject(error);
  axiosInstance?.axiosCanceler?.removePending(config as IRequestConfig);
  if (axios.isCancel(error)) return; // 防止取消请求引起响应异常
  const { errorHandler } = config as IRequestConfig;
  if (isFunction(errorHandler)) {
    errorHandler(error);
  }
  return Promise.reject(error);
};
