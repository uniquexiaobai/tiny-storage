const get = (key: string) => {
  const now = Date.now();
  let store;

  try {
    store = JSON.parse(localStorage.getItem(key) as string);
  } catch (err) {
    return null;
  }

  if (!store || store.data == null) return null;

  if (store.expires > 0 && store.expires <= now) return null;

  return store.data;
};

const set = (key: string, value: any, options = { maxAge: 0 }) => {
  const now = Date.now();
  const expires = options.maxAge > 0 ? now + options.maxAge : 0;
  const store = JSON.stringify({
    data: value,
    expires,
  });

  try {
    localStorage.setItem(key, store);
    return true;
  } catch (err) {
    return false;
  }
};

const remove = (key: string) => {
  localStorage.removeItem(key);
};

const clear = () => {
  localStorage.clear();
};

const size = () => {
  return localStorage.length;
};

// TODO create instance
function create() {}

const tinyStorage = {
  get,
  set,
  remove,
  clear,
  size,
  create,
};

export default tinyStorage;
