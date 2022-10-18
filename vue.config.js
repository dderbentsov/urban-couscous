const { defineConfig } = require("@vue/cli-service");
const tailwind = require("tailwindcss");
const tailwindConfig = require("./tailwind.config");

module.exports = defineConfig({
  css: {
    loaderOptions: {
      postcss: {
        postcssOptions: tailwind(tailwindConfig)
      }
    }
  },
  chainWebpack: (config) => {
    const pugRule = config.module.rule("pug");

    pugRule.uses.clear();
    pugRule.oneOfs.clear();
  },
  parallel: false,

  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.pug$/,
          oneOf: [
            {
              resourceQuery: /^\?vue/u,
              loader: "@webdiscus/pug-loader",
              options: {
                method: "html",
              },
            },
            {
              loader: "@webdiscus/pug-loader",
              options: {
                method: "compile",
              },
            },
          ],
        },
      ],
    },
  },
});
