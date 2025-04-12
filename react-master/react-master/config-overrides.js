const {
  useBabelRc,
  removeModuleScopePlugin,
  override,
  disableEsLint,
  // addBundleVisualizer,
} = require("customize-cra");
const webpack = require('webpack')
module.exports = override((config)=>{
  config.plugins.unshift(new webpack.IgnorePlugin({
    resourceRegExp: /^\.\/react-native$/,
  }))
  // console.log(config.plugins)
  // config.module.rules[1].oneOf[2].exclude = ['/*/**/react-native/'];
  // config.module.rules[1].oneOf[3].exclude = ['/*/**/react-native/'];
  // throw 'error'
  return config
}, useBabelRc(), disableEsLint(), removeModuleScopePlugin());
