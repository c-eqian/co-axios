import { AxiosError, type AxiosRequestConfig, type AxiosResponse } from 'axios';
import { Ref } from 'vue-demi';
export type MaybeRecord<T> = T & Record<string, unknown>;
// 请求响应参数，包含data
export interface IResponse extends AxiosResponse {
  $config: IRequestConfig;
}

/**
 * 请求参数配置
 */
export interface IRequestConfig extends AxiosRequestConfig {
  /**
   * 是否携带时间戳,默认参数名：_t
   * 如果是字符串将作为参数名称
   * @default true
   */
  withTimestamp?: boolean;
  /**
   * 是否需要过滤空值参数
   * 可以根据自定义空值过滤，传入一个数组，如：[null, '']
   * @default true
   */
  isFilterEmpty?: boolean | Array<any>;
  /**
   * 请求头
   */
  header?: Record<string, any>;
  /**
   * 响应字段配置
   */
  responseFields?: {
    /**
     * 数据字段
     * @default data
     */
    data?: string;
    /**
     * 响应信息字段
     * @default msg
     */
    msg?: string;
    /**
     * 状态码字段
     * @default code
     */
    code?: string;
    [k: string]: any;
  };
  /**
   * 请求前
   * @param config
   */
  preRequest?: (config: IRequestConfig) => IRequestConfig;
  /**
   * 请求后
   * @param response
   */
  preResponse?: (response: IResponse) => MaybeRecord<IResponse> | void;
  /**
   * 请求错误处理
   * @param err
   */
  errorHandler?: (err: AxiosError) => void;
}

/**
 * 成功回调方法类型
 */
export type OnSuccessCallback<T = any> = (callback: AxiosResponse<T>) => void;
/**
 * 失败回调方法类型
 */
export type OnErrorCallback<T = any> = (callback: AxiosError<T>) => void;
/**
 * 方法类型
 */
export type MethodReturn<T = any> = {
  /**
   * 终止请求函数
   */
  abort: () => void;
  /**
   * 返回数据
   */
  data: Ref<T>;
  /**
   * 请求状态
   */
  loading: Ref<boolean>;
  /**
   * 错误回调
   * @param err
   */
  onError: (callback: OnErrorCallback) => void;
  /**
   * 成功回调
   * @param data
   */
  onSuccess: (callback: OnSuccessCallback<T>) => void;
  /**
   * 主动请求方式
   */
  request: () => void;
};
export type RequestReturn<T = any> = {
  /**
   * 终止请求函数
   */
  abort: () => void;
  /**
   * 请求方式
   */
  request: () => Promise<T>;
};
export type Options = {
  /**
   * 是否立即执行
   * @default false
   */
  immediate?: boolean;
};
