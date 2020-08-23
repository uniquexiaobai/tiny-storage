type Options = {
  name?: string;
  driver?: any;
  maxAge?: number;
};

const getKeys = (baseOptions: Options) => (): string[] => {
  const { name, driver } = baseOptions;

  let i = 0,
    len = driver.length,
    keys = [],
    key;
  for (; i < len; i++) {
    key = driver.key(i);
    if (key.startsWith(name)) {
      keys.push(key);
    }
  }

  return keys;
};

const get = (baseOptions: Options) => (key: string) => {
  const { name, driver } = baseOptions;

  const now = Date.now();
  let store;

  try {
    store = JSON.parse(driver.getItem(`${name}__${key}`) as string);
  } catch (err) {
    return null;
  }

  if (!store || store.data == null) return null;

  if (store.expires && store.expires <= now) return null;

  return store.data;
};

const set = (baseOptions: Options) => (
  key: string,
  value: any,
  options: Options
) => {
  const { name, driver, maxAge = 0 } = { ...baseOptions, ...options };

  const now = Date.now();
  const expires = maxAge > 0 ? now + maxAge * 1000 : void 0;
  const store = JSON.stringify({
    data: value,
    expires,
  });

  try {
    driver.setItem(`${name}__${key}`, store);
    return true;
  } catch (err) {
    return false;
  }
};

const remove = (baseOptions: Options) => (key: string) => {
  const { name, driver } = baseOptions;

  driver.removeItem(`${name}__${key}`);
};

const clear = (baseOptions: Options) => () => {
  const { name, driver } = baseOptions;

  if (!name) {
    driver.clear();
  } else {
    const keys = getKeys(baseOptions)();
    keys.forEach(key => {
      driver.removeItem(key);
    });
  }
};

const size = (baseOptions: Options) => () => {
  const { name, driver } = baseOptions;

  if (!name) return driver.length;

  const keys = getKeys(baseOptions)();

  return keys.length;
};

// name: 储存的 key 的前缀
// driver: localStorage/sessionStorage
// maxAge: 默认过期时间，单位：秒
function create(options: Options) {
  options.name = options.name || '';
  options.maxAge = options.maxAge || 0;
  options.driver = options.driver || localStorage;

  return {
    get: get(options),
    set: set(options),
    remove: remove(options),
    clear: clear(options),
    size: size(options),
    create: create,
  };
}

const defaultOptions: Options = {
  name: '',
  maxAge: 0,
  driver: localStorage,
};

const tinyStorage = {
  get: get(defaultOptions),
  set: set(defaultOptions),
  remove: remove(defaultOptions),
  clear: clear(defaultOptions),
  size: size(defaultOptions),
  create,
};

export default tinyStorage;
