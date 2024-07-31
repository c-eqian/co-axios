import axios, { type AxiosInstance } from 'axios';
import { IRequestConfig, MethodReturn } from './types/index';
import { baseConfig } from './axiosDefaultConfig';
import { useMerge } from 'co-utils-vue';
import { handleRequest } from './utils/handleRequest';
import { handleRequestError, handleResponseError } from './utils/handleError';
import { handleResponse } from './utils/handleResponse';
import { AxiosCanceler } from './utils/AxiosCanceler';
class RequestHttp {
  // 定义成员变量并指定类型
  #service: AxiosInstance;
  public axiosCanceler: AxiosCanceler;

  public constructor(config?: IRequestConfig) {
    const _config = useMerge(baseConfig, config ?? {});
    // 实例化axios
    this.#service = axios.create(_config);
    this.axiosCanceler = new AxiosCanceler();
    /**
     * 请求拦截器
     */
    this.#service.interceptors.request.use(
      config => handleRequest(config, this),
      error => handleRequestError(error)
    );

    /**
     * 响应拦截器
     * 服务器换返回信息 -> [拦截统一处理] -> 客户端JS获取到信息
     */
    this.#service.interceptors.response.use(
      response => handleResponse(response, this),
      error => handleResponseError(error, this)
    );
  }
  async request<T = any>(method: string, params: IRequestConfig): Promise<T> {
    return await this.#service[method](
      <string>params.url,
      ['get', 'post'].includes(method) ? params.data : params
    );
  }
  // 常用方法封装
  get<T>(params: IRequestConfig): MethodReturn<T> {
    return {
      abort: () => this.axiosCanceler.removePending(params),
      request: () => this.request<T>('get', params)
    };
  }

  post<T>(params: IRequestConfig): MethodReturn<T> {
    return {
      abort: () => this.axiosCanceler.removePending(params),
      request: () => this.request<T>('post', params)
    };
  }

  put<T>(params: IRequestConfig): MethodReturn<T> {
    return {
      abort: () => this.axiosCanceler.removePending(params),
      request: () => this.request<T>('put', params)
    };
  }

  delete<T>(params: IRequestConfig): MethodReturn<T> {
    return {
      abort: () => this.axiosCanceler.removePending(params),
      request: () => this.request<T>('get', params)
    };
  }
}

// 导出一个实例对象
export default RequestHttp;
