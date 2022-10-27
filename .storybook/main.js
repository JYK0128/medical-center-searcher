const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
  stories: ['/src/stories/*.stories.@(jsx|tsx|mdx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/preset-create-react-app'
  ],
  webpackFinal: async config => {
    config.resolve.plugins.push(new TsconfigPathsPlugin({}));
    return config;
  }
};
