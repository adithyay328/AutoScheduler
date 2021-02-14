const CracoLessPlugin = require('craco-less');
const path = require('path');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { 
                '@primary-color': '#88AEED',
                '@font-size-base': '16px',
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
  webpack: {
    alias: {
        'app': path.resolve(__dirname, 'src/'),
        'components': path.resolve(__dirname, 'src/components/'),
        'services': path.resolve(__dirname, 'src/services/'),
        'styles': path.resolve(__dirname, 'src/styles/'),
        'utils': path.resolve(__dirname, 'src/utils/')
    }
  }
};
