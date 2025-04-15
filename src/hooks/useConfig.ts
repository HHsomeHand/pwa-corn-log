import {ref, watch} from 'vue'

function _getValue<T>(key:string , defaultValue: T): string | T {
  const stored = localStorage.getItem(key);

  return stored || defaultValue;
}

function _setValue<T>(key: string, value: T): void {
  if (value === undefined || value === null) {
    localStorage.removeItem(key);
  } else {
    localStorage.setItem(key, String(value));
  }
}

// 类型拓展：ref 对象 + setDefault 方法
export type ConfigRef<T> = Ref<T> & {
  setDefault: () => void;
};

// 类似于ref, 但会自动 localStorage 保存值
export function useConfig<T>(key: string, defaultValue: T) {
  const isObjOrArr = (typeof defaultValue === 'object' || Array.isArray(defaultValue));

  let storeValue = _getValue(key, defaultValue);

  if (isObjOrArr) {
    if (storeValue !== defaultValue) {
      try {
        // JSON.parse({}) 会报错
        storeValue = JSON.parse(storeValue as string);
      } catch (e) {
        console.error(e);
      }
    }

    if (storeValue === null) {
      storeValue = defaultValue;
    }
  }

  if (typeof defaultValue === 'boolean') {
    storeValue = Boolean(defaultValue) as T;
  }

  // 双重断言, 瞒天过海, 骗过 TS 编译器
  const config = ref(storeValue) as unknown as ConfigRef<T>;

  watch(config, () => {
    if (isObjOrArr) {
      // GM_setValue 无法直接保存Object, 得先转成JSON
      let jsonString = JSON.stringify(config.value);
      _setValue(key, jsonString);
    } else {
      _setValue(key, config.value);
    }
  }, {deep: true});

  config.setDefault = () => {
    config.value = defaultValue;
  };

  return config;
}