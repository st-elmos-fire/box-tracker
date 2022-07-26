const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

const pathsPlugin = new TsconfigPathsPlugin({
  configFile: path.resolve(__dirname, '../tsconfig.json')
});

module.exports = {
  core: {
    builder: 'webpack5'
  },
  framework: '@storybook/react',
  features: {
    storyStoreV7: !global.navigator?.userAgent?.match?.('jsdom'),
    interactionsDebugger: true
  },
  stories: ['../components/**/*.stories.mdx', '../partials/**/*.stories.mdx'],
  addons: ['@storybook/addon-essentials'],
  staticDirs: [
    { from: '../public', to: '/public' },
    { from: '../lib/mocks', to: '/mocks' }
  ],
  features: {
    postcss: false
  },
  webpackFinal: async (config) => {
    if (config.resolve.plugins) {
      config.resolve.plugins.push(pathsPlugin);
    } else {
      config.resolve.plugins = [pathsPlugin];
    }
    config.module.rules.push(
      {
        test: /\.md$/,
        use: [
          {
            loader: 'markdown-loader'
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'static/assets/',
              publicPath: 'static/assets/'
            }
          }
        ]
      },
      {
        test: /\.module.scss|scss$/,
        use: [
          require.resolve('style-loader'),
          {
            loader: require.resolve('css-loader'),
            options: {
              importLoaders: 1,
              modules: {
                localIdentName: 'c-[hash:base64:5]__[folder]--[local]',
                namedExport: false
              }
            }
          },
          {
            loader: require.resolve('sass-loader'),
            options: {
              // Prefer `dart-sass`
              implementation: require('sass'),
              sourceMap: false,
              additionalData: `
                @use '/styles/vars' as *;
                @use '/styles/breakpoints' as *;
                @use '/styles/utilities' as utils;
                @use '/styles/animations' as animations;
              `,
              sassOptions: {
                outputStyle:
                  process.env.NODE_ENV !== 'production'
                    ? 'expanded'
                    : 'compressed',
                indentWidth: 4
              }
            }
          }
        ],
        include: path.resolve(__dirname, '../')
      }
    );
    (config.resolve.alias = {
      ...config.resolve.alias
    }),
      config.resolve.extensions.push('.ts', '.tsx', '.md');
    return config;
  }
};
