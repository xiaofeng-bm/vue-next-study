import { mutableHandlers } from "./baseHandlers";

export const enum ReactiveFlags {
  SKIP = '__v_skip',
  IS_REACTIVE = '__v_isReactive',
  IS_READONLY = '__v_isReadonly',
  RAW = '__v_raw'
}

export interface Target {
  [ReactiveFlags.SKIP]?: boolean
  [ReactiveFlags.IS_REACTIVE]?: boolean
  [ReactiveFlags.IS_READONLY]?: boolean
  [ReactiveFlags.RAW]?: any
}

// 创建WeakMap用于缓存已经进行Proxy处理的对象
export const reactiveMap = new WeakMap<Target, any>()

// reactive响应式入口函数
export function reactive(target: object) {
  return createReactiveObject(target, false, mutableHandlers);
}

function createReactiveObject(
  target: object,
  isReadonly: boolean,
  baseHandlers: ProxyHandler<any>
) {
  const proxyMap = reactiveMap;
  // 取：先尝试从reactiveMap取当前target的缓存，取到了就返回，取不到继续向下执行
  const existingProxy = proxyMap.get(target)
  if(existingProxy) {
    return existingProxy
  }
  // 创建一个proxy对象 baseHandlers是处理函数
  const proxy = new Proxy(target, baseHandlers);
  // 存：将当前target和生成的proxy存入WeakMap中
  proxyMap.set(target, proxy)
  return proxy;
}
