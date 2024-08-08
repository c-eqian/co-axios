import { useBaseFetch } from './useBaseFetch';
import type { IRequestConfig, MethodReturn, Options } from '../types';

export const usePostFetch = <T = any>(
  config: IRequestConfig,
  options?: Options
): MethodReturn<T> => {
  return useBaseFetch('post', config, options);
};
