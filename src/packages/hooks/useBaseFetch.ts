import { getInstance } from '../hooks/useInstance';
import {
  type IRequestConfig,
  MethodReturn,
  OnErrorCallback,
  OnSuccessCallback,
  Options
} from '../types';
import { Ref, ref } from 'vue-demi';
import { isFunction } from '@eqian/utils-vue';

/**
 *
 * @param method 方法
 * @param config 请求配置
 * @param options 其他额外配置
 */
export const useBaseFetch = <T = any>(
  method: 'get' | 'post' | 'put' | 'patch' | 'delete',
  config: IRequestConfig,
  options?: Options
): MethodReturn<T> => {
  const instance = getInstance();
  const data = ref<T>() as Ref<T>;
  const loading = ref<boolean>(false) as Ref<boolean>;
  const { $http } = instance;
  const { immediate = false } = options ?? ({} as Options);
  const { abort, request: send } = $http[method]<T>(config);
  const cacheFn: Record<string, any> = {};
  const onSuccess = (callback: OnSuccessCallback) => {
    cacheFn['onSuccess'] = callback;
  };
  const onError = (callback: OnErrorCallback) => {
    cacheFn['onError'] = callback;
  };
  const request = async () => {
    loading.value = true;
    try {
      data.value = await send();
      const successFn = cacheFn['onSuccess'];
      if (successFn && isFunction(successFn)) {
        successFn.call(null, data.value);
      }
    } catch (e) {
      const errorFn = cacheFn['onError'];
      if (errorFn && isFunction(errorFn)) {
        errorFn.call(null, e);
      }
    } finally {
      loading.value = false;
    }
  };
  (async function () {
    if (immediate) {
      await request();
    }
  })();
  if (immediate) {
    loading.value = true;
  }
  return {
    abort,
    data,
    loading,
    onSuccess,
    onError,
    request
  };
};
