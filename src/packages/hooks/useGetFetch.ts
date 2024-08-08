import { useBaseFetch } from './useBaseFetch';
import type { IRequestConfig, Options } from '../types';

export const useGetFetch = <T = any, P = any>(config: IRequestConfig, options?: Options) => {
  return useBaseFetch<T, P>('get', config, options);
};
