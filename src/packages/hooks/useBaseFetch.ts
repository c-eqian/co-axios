import { getInstance } from '../hooks/useInstance';
import type {
  IRequestConfig,
  MethodReturn,
  OnErrorCallback,
  OnSuccessCallback,
  OnCompletedCallback,
  Options
} from '../types';
import { Ref, ref } from 'vue-demi';
import { isFunction } from '@eqian/utils-vue';
import { generateUid } from '../utils/uid';

/**
 *
 * @param method 方法
 * @param config 请求配置
 * @param options 其他额外配置
 */
export const useBaseFetch = <T = any, P = any>(
  method: 'get' | 'post' | 'put' | 'patch' | 'delete',
  config: IRequestConfig,
  options?: Options
): MethodReturn<T, P> => {
  const instance = getInstance();
  const data = ref<T>() as Ref<T>;
  const loading = ref<boolean>(false) as Ref<boolean>;
  const { $http } = instance;
  const { immediate = false, key = generateUid() } = options ?? ({} as Options);
  const { abort, request: send } = $http[method]<T>(config);
  const cacheFn: Record<string, any> = {};
  const onSuccess = (callback: OnSuccessCallback) => {
    cacheFn[`onSuccess-${key}`] = callback;
  };
  const onError = (callback: OnErrorCallback) => {
    cacheFn[`onError-${key}`] = callback;
  };
  const onCompleted = (callback: OnCompletedCallback) => {
    cacheFn[`onCompleted-${key}`] = callback;
  };
  const request = async (parameter?: P) => {
    loading.value = true;
    try {
      data.value = await send(parameter);
      const successFn = cacheFn[`onSuccess-${key}`];
      if (successFn && isFunction(successFn)) {
        successFn.call(null, data.value);
      }
    } catch (e) {
      const errorFn = cacheFn[`onError-${key}`];
      if (errorFn && isFunction(errorFn)) {
        errorFn.call(null, e);
      }
    } finally {
      loading.value = false;
      const completedFn = cacheFn[`onCompleted-${key}`];
      if (completedFn && isFunction(completedFn)) {
        completedFn.call(null);
      }
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
    onCompleted,
    request
  };
};
