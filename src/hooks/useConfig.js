
import { ref, watch } from 'vue'

function _getValue(key, defaultValue) {
  const stored = localStorage.getItem(key);

  return stored || defaultValue;
}

function _setValue(key, value) {
  if (value === undefined || value === null) {
    localStorage.removeItem(key);
  } else {
    localStorage.setItem(key, String(value));
  }
}

// 类似于ref, 但会自动GM_setValue保存值
export function useConfig(key, defaultValue) {
  const isObjOrArr = (typeof defaultValue === 'object' || Array.isArray(defaultValue));

  let storeValue = _getValue(key, defaultValue);

  if (isObjOrArr) {
    if (storeValue !== defaultValue) {
      try {
        // JSON.parse({}) 会报错
        storeValue = JSON.parse(storeValue);
      } catch (e) {
        console.error(e);
      }
    }

    if (storeValue === null) {
      storeValue = defaultValue;
    }
  } 

  const config = ref(storeValue);

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