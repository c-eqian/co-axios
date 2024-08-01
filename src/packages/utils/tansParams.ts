import { isEmpty, isObjectLike } from '@eqian/utils-vue';

/**
 * 参数处理
 * @param {*} params  参数
 */
export function tansParams(params: { [x: string]: any }) {
  if (isEmpty(params)) return '';
  if (!isObjectLike(params)) return '';
  let result = '';
  // eslint-disable-next-line no-restricted-syntax
  for (const propName of Object.keys(params)) {
    const value = params[propName];
    const part = `${encodeURIComponent(propName)}=`;
    if (value !== null && value !== '' && typeof value !== 'undefined') {
      if (typeof value === 'object') {
        // eslint-disable-next-line no-restricted-syntax
        for (const key of Object.keys(value)) {
          if (value[key] !== null && value[key] !== '' && typeof value[key] !== 'undefined') {
            const _params = `${propName}[${key}]`;
            const subPart = `${encodeURIComponent(_params)}=`;
            result += `${subPart + encodeURIComponent(value[key])}&`;
          }
        }
      } else {
        result += `${part + encodeURIComponent(value)}&`;
      }
    }
  }
  return result;
}
