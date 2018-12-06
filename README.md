# Craco resolve-url-loader plugin

A plugin to fix the annoying way sass/scss doesn't support relative paths out of
the box in your create-react-app v2 application. Without ejecting!

## Installation

npm install --save craco-resolve-url-loader

update your craco.config.js as follows:
```javascript
const resolveUrlLoader = require('craco-resolve-url-loader');

module.exports = {
  plugins:[{
    plugin:resolveUrlLoader
  }]
};
```

Now sass and scss files will resolve url's relative to the current file like so:

```scss
@font-face {
  font-family: 'myfont';
  src: url('../fonts/myfont.eot?v=0.1.0');
  font-weight: normal;
  font-style: normal;
}
  ```


## License

Licensed under the MIT License, Copyright ©️ 2018 Michael Smit. See [LICENSE.md](LICENSE.md) for more information.
