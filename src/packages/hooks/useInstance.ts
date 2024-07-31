import { type ComponentPublicInstance, getCurrentInstance } from 'vue-demi';
import RequestHttp from '../interceptor';
type InstanceProxy = ComponentPublicInstance & {
  $http: RequestHttp;
};
export const getInstance = (): InstanceProxy => {
  const instance = getCurrentInstance();
  if (!instance) {
    throw new Error('无法获取当前实例！！！');
  }
  return instance.proxy as InstanceProxy;
};
