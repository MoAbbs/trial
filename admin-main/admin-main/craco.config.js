const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const WebpackBar = require("webpackbar");
// const CracoAntDesignPlugin = require("craco-antd");
// const path = require("path");
const BabelRcPlugin = require('@jackwilsdon/craco-use-babelrc');
const CracoLessPlugin = require('craco-less');

// Don't open the browser during development
// process.env.BROWSER = "none";

module.exports = {
  webpack: {
    plugins: [
      new WebpackBar({ profile: true }),
      ...(process.env.NODE_ENV === "development"
        ? [new BundleAnalyzerPlugin({ openAnalyzer: false })]
        : []),
    ],
  },
  plugins: [
    {
      plugin: {
        overrideWebpackConfig: ({ webpackConfig }) => {
            const lessExtension = /\.module\.less$/;
            const lessRules = {
              oneOf: [{
                test: lessExtension,
                exclude: /(node_modules|bower_components)/,
                use: [
                  {
                    loader: require.resolve('style-loader')
                  }, {
                    loader: require.resolve('css-loader'),
                    options: {
                      modules: true,
                    },
                  }, {
                    loader: require.resolve('less-loader'),
                    options: {
                      lessOptions: {
                        strictMath: true,
                      },        
                    }
                  }
                ]
              }]
            }
            // const lessAntd = {
            //   oneOf: [{
            //     test: /antd.*\.less$/,
            //     use: [
            //       {loader: 'style-loader'},
            //       {loader: 'css-loader'},
            //       {
            //         loader: 'less-loader',
            //         options: {
            //         },
            //       },
            //     ]
            //   }]
            // }
            console.log(webpackConfig)
            const oneOfRule = webpackConfig.module.rules.find(rule => (
              typeof rule.oneOf !== 'undefined'
            ));
            const appendTo = oneOfRule ? oneOfRule.oneOf : webpackConfig.module.rules;
            appendTo.push(lessRules);
            // appendTo.push(lessAntd);
  
            return webpackConfig;
          },
        }
      },
    { plugin: BabelRcPlugin },
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { '@primary-color': process.env.PRIMARY_COLOR },
            javascriptEnabled: true,
          },
        },
      },
    },
    // {
    //   plugin: CracoAntDesignPlugin,
    //   options: {
    //     customizeThemeLessPath: path.join(
    //       __dirname,
    //       "customTheme.less"
    //     ),
    //   },
    // },
  ],
};