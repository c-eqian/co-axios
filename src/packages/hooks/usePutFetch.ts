import { useBaseFetch } from './useBaseFetch';
import type { IRequestConfig, Options } from '../types';

export const usePutFetch = <T = any, P = any>(config: IRequestConfig, options?: Options) => {
  return useBaseFetch<T, P>('put', config, options);
};
