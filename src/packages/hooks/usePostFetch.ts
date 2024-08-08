import { useBaseFetch } from './useBaseFetch';
import type { IRequestConfig, Options } from '../types';

export const usePostFetch = <T = any, P = any>(config: IRequestConfig, options?: Options) => {
  return useBaseFetch<T, P>('post', config, options);
};
