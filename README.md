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

tinyStorage.get('a'); // output: 1

tinyStorage.remove('a');
```
