const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,

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
      ],
    },
  },
});
