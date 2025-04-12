module.exports = function (api) {
  api.cache(true);
  return {
    ignore: ['*/**/react-native/*.js'],
    presets: ['@babel/preset-react'],
    plugins: [
      '@babel/transform-runtime',
      '@babel/plugin-transform-spread',
      '@babel/plugin-transform-flow-strip-types',
      '@babel/proposal-class-properties',
      '@babel/proposal-object-rest-spread',
      '@babel/plugin-syntax-dynamic-import',
      [
        '@babel/plugin-proposal-decorators',
        {
          legacy: true,
        },
      ],
      [
        'transform-imports',
        {
          lodash: {
            transform: 'lodash/${member}',
            preventFullImport: false,
          },
          moment: {
            transform: 'moment/${member}',
            preventFullImport: false,
          },
        },
      ],
      [
        'module-resolver',
        {
          root: ['./src'],
          rules: [
            {
              test: /\.css$/i,
              use: [
                // The `injectType`  option can be avoided because it is default behaviour
                { loader: 'style-loader', options: { injectType: 'styleTag' } },
                'css-loader',
              ],
            },
          ],
        },
      ],
      '@babel/transform-modules-commonjs',
    ],
  };
};
