const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({

  chainWebpack: (config) => {
    const pugRule = config.module.rule('pug');

    pugRule.uses.clear();
    pugRule.oneOfs.clear();
  },

  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.pug$/,
          oneOf: [
            {
              resourceQuery: /^\?vue/u,
              loader: '@webdiscus/pug-loader',
              options: {
                method: 'html',
              },
            },
            {
              loader: '@webdiscus/pug-loader',
              options: {
                method: 'compile',
              },
            },
          ],
        },
        {
          test: /\.scss$/,
          use: [
            {
              loader: 'postcss-loader'
            },
            {
              loader: 'sass-loader'
            },
          ]
        },
      ],
    },
  },
});
