import type { IRequestConfig } from './types';

export const baseConfig: IRequestConfig = {
  // 设置超时时间
  timeout: 10000,
  // 跨域时候允许携带凭证
  withCredentials: true,
  //   请求头
  headers: {
    'content-Type': 'application/json'
  },
  /**
   * 过滤空值
   */
  isFilterEmpty: true
};
