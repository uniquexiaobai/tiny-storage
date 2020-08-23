# tinyStorage

> A tiny localStorage API

### Install

```bash
npm install @lokibai/tiny-storage
```

### Usage

```js
import tinyStorage from '@lokibai/tiny-storage';
// const tinyStorage = require('tiny-storage');

tinyStorage.get('a', 1);
tinyStorage.set('b', { x: 2 });
tinyStorage.set('c', 3, { maxAge: 60 }); // expires after 1 minute

tinyStorage.get('b'); // output: { x: 2}

tinyStorage.remove('a'); // remove a item

tinyStorage.size(); // output: 2

tinyStorage.clear(); // remove all items

tinyStorage.size(); // output: 0

// create a new instance, different instance don't affect each other
const instance = tinyStorage.create({
  name: 'mystorage', // prefix for the key
  driver: sessionStorage, // default: localStorage
  maxAge: 60, // set the default maxAge
});
```
