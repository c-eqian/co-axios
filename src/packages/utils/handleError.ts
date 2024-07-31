import axios, { AxiosError } from 'axios';
import { IRequestConfig } from '../types';
import { isFunction } from 'co-utils-vue';
import RequestHttp from '@/packages/interceptor';

export const handleRequestError = (err: Error | undefined) => {
  // 请求报错
  Promise.reject(err);
};
export const handleResponseError = (error: AxiosError, axiosInstance: RequestHttp) => {
  const { config } = error;
  axiosInstance?.axiosCanceler?.removePending(config as IRequestConfig);
  if (axios.isCancel(error)) return; // 防止取消请求引起响应异常
  const { errorHandler } = config as IRequestConfig;
  if (isFunction(errorHandler)) {
    errorHandler(errorHandler);
  }
  return Promise.reject(error);
};