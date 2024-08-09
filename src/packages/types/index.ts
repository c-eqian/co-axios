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
export interface IRequestConfig<T = any> extends Omit<AxiosRequestConfig, 'params' | 'data'> {
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
   * 重写AxiosRequestConfig.data
   */
  data?: T | Ref<T>;
  /**
   * 重写AxiosRequestConfig.params
   */
  params?: T | Ref<T>;
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
 * 完成回调方法类型
 */
export type OnCompletedCallback = () => void;
/**
 * 失败回调方法类型
 */
export type OnErrorCallback<T = any> = (callback: AxiosError<T>) => void;
/**
 * use[xxx],提供插件实例的方法
 * 方法类型
 */
export type MethodReturn<T = any, P = any> = {
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
   * 成功回调
   * @param data
   */
  onSuccess: (callback: OnSuccessCallback<T>) => void;
  /**
   * 执行完成，成功与否都会执行
   */
  onCompleted: (callback: OnCompletedCallback) => void;
  /**
   * 错误回调
   * @param err
   */
  onError: (callback: OnErrorCallback) => void;
  /**
   * 请求方式
   * 支持传入参数
   * 如果是get、delete将会覆盖params, 如果是post、put将会覆盖data
   * @param parameter
   */
  request: (parameter?: P) => Promise<void>;
};
export type RequestReturn<T = any, P = any> = {
  /**
   * 终止请求函数
   */
  abort: () => void;
  /**
   * 请求方式
   * 支持传入参数
   * 如果是get、delete将会覆盖params, 如果是post、put将会覆盖data
   * @param parameter
   */
  request: (parameter?: P) => Promise<T>;
};
export type Options = {
  /**
   * 是否立即执行
   * @default false
   */
  immediate?: boolean;
  /**
   * 方法实例KEY
   * 如果不传，默认生成
   */
  key?: string;
};

/**
 * 参数观察
 */
export type ParameterWatcher<P = any, D = any> = {
  watcher?: {
    keys?: (keyof P)[];
    /**
     * watch 是否立即执行属性
     * @default false
     */
    immediate?: boolean;
    /**
     * watch 深度监听属性
     * @default false
     */
    deep?: boolean;
  };
  /**
   * 请求前参数处理
   * @param params
   */
  handleParams?: (params: P) => P;
  /**
   * 分页键
   * @default pageNum
   */
  pageNumKey?: string;
  /**
   * 分页键
   * @default pageSize
   */
  pageSizeKey?: string;
  /**
   * 返回结果的数据列表键
   * @default list
   * @example
   * ```ts
   * // 响应数据为 { data: { list: [] } } 则传递 data.list;
   * ````
   */
  listKey?: string;
  /**
   * 返回结果的数据列表键
   * @default total
   * ```ts
   * // 响应数据为 { data: { list: [], total: 0 } } 则传递 data.total;
   * ```
   */
  totalKey?: string;
  /**
   * 自定义响应时处理，返回值必须包含listKey，totalKey，如果为空，应返回对应的默认值，即list、total
   * @param res
   */
  responseHandler?: (res: D) => any;
};
export type UsePaginationOptions<P = any, D = any> = ParameterWatcher<P, D> & Options;
