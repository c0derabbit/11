---
layout: post.njk
title:  Customising Ant Design theme in a create-react-app project
date:   2019-12-08
---

There comes a time in some developers’ life when they have to customize an [antd](https://ant.design) theme. It’s [kind of documented](https://ant.design/docs/react/customize-theme), but tricky. Here’s a tl;dr.

### But first… why antd?
Well, it looks like a very complete UI system. Creating your own is a lot of effort, so why not use something that’s out there and working perfectly? Of course, there are other alternatives, like [Material UI](https://material-ui.com/) or [Evergreen](https://evergreen.segment.com/).

With that out of the way, let’s jump right in.

## CRA 2.0+ (most probably this is what you’ll need)

```sh
yarn add antd
yarn add @craco/craco craco-antd babel-plugin-import less less-loader
```

In `package.json`:
```diff
-  "start": "react-scripts start",
-  "build": "react-scripts build",
+  "start": "craco start",
+  "build": "craco build",
```

In `App.(j|t)sx`:
```js
import 'antd/dist/antd.less';
```

Create `craco.config.js` in root:
```js
const CracoAntDesignPlugin = require('craco-antd');

process.env.BROWSER = 'none'; // optional, disables auto-open every time you restart

module.exports = {
  jest: {
    configure(config) {
      config.transformIgnorePatterns = [
        '/node_modules/(?!antd|rc-pagination|rc-calendar|rc-tooltip)/.+\\.js$',
      ];
      return config;
    },
  },
  plugins: [{ plugin: CracoAntDesignPlugin }],
};
```

### Theming
Craco will pick up a theme from `antd.customize.less`.[^1]
```less
 @primary-color: red;
```

### Live style reload
Themes will not reload real-time by default. However, this is easy to solve with **nodemon**.
```sh
yarn add -D nodemon
```

Update `package.json`:
```diff
-  "start": "craco start",
+  "start": "nodemon -w craco.config.js -w ./antd.customize.less --exec 'craco start'",
```

## CRA Pre-2.0 (if your project is older)

```sh
yarn add antd
yarn add babel-plugin-import customize-cra less less-loader react-app-rewired
```

In `package.json`:
```diff
-  "start": "react-scripts start",
-  "build": "react-scripts build",
-  "test": "react-scripts test",
+  "start": "react-app-rewired start",
+  "build": "react-app-rewired build",
+  "test": react-app-rewired test",
```

In `App.(j|t)sx`:
```js
import 'antd/dist/antd.less';
```

Create `config-overrides.js` in root:
```js
const { override, fixBabelImports, addLessLoader } = require('customize-cra');

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: {
      '@primary-color': 'red',
    },
  }),
);
```

### Advanced theming
Nobody in your team will look for themes in `config-overrides.js` however, so let’s extract the theme somewhere where it makes sense.

Create a `theme.js` with a simple object exported:
```js
module.exports = {
  '@primary-color': 'red',
};
```

Now replace the theme changes in `config-overrides.js`:
```diff
const { override, fixBabelImports, addLessLoader } = require('customize-cra');
+ const theme = require('./path/to/theme');

module.exports = override(
  ...
  addLessLoader({
    javascriptEnabled: true,
-    modifyVars: {
-      '@primary-color': 'red',
-    },
+    modifyVars: theme,
  }),
);
```

---
#### Notes

[^1]: See all customisable variables [here](https://github.com/ant-design/ant-design/blob/master/components/style/themes/default.less).
