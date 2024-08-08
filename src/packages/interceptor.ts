import axios, { type AxiosInstance } from 'axios';
import type { IRequestConfig, RequestReturn } from './types/index';
import { baseConfig } from './axiosDefaultConfig';
import { useMerge } from '@eqian/utils-vue';
import { handleRequest } from './utils/handleRequest';
import { handleRequestError, handleResponseError } from './utils/handleError';
import { handleResponse } from './utils/handleResponse';
import { AxiosCanceler } from './utils/AxiosCanceler';
import { ref, Ref, unref } from 'vue-demi';
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
    if (['put', 'post'].includes(method)) {
      params.data = unref(params.data);
      return await this.#service[method](<string>params.url, unref(params.data), params);
    }
    params.params = unref(params.params);
    return await this.#service[method](<string>params.url, params);
  }
  // 常用方法封装
  get<T = any, P = any>(params: IRequestConfig): RequestReturn<T, P> {
    const newParams: Ref<IRequestConfig> = ref(params);
    return {
      abort: () => this.axiosCanceler.removePending(newParams.value),
      request: (parameter?: P) => {
        if (parameter) {
          newParams.value.params = parameter;
        }
        return this.request<T>('get', newParams.value);
      }
    };
  }
  delete<T = any, P = any>(params: IRequestConfig): RequestReturn<T, P> {
    const newParams: Ref<IRequestConfig> = ref(params);
    return {
      abort: () => this.axiosCanceler.removePending(newParams.value),
      request: (parameter?: P) => {
        if (parameter) {
          newParams.value.params = parameter;
        }
        return this.request<T>('delete', newParams.value);
      }
    };
  }
  post<T = any, P = any>(params: IRequestConfig): RequestReturn<T, P> {
    const newParams: Ref<IRequestConfig> = ref(params);
    return {
      abort: () => this.axiosCanceler.removePending(newParams.value),
      request: (parameter?: P) => {
        if (parameter) {
          newParams.value.data = parameter;
        }
        return this.request<T>('post', newParams.value);
      }
    };
  }

  put<T = any, P = any>(params: IRequestConfig): RequestReturn<T, P> {
    const newParams: Ref<IRequestConfig> = ref(params);
    return {
      abort: () => this.axiosCanceler.removePending(newParams.value),
      request: (parameter?: P) => {
        if (parameter) {
          newParams.value.data = parameter;
        }
        return this.request<T>('put', newParams.value);
      }
    };
  }
}

// 导出一个实例对象
export default RequestHttp;
