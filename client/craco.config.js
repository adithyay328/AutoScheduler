const CracoLessPlugin = require('craco-less');
const path = require('path');
// https://ant.design/docs/react/customize-theme
module.exports = {
    plugins: [
        {
            plugin: CracoLessPlugin,
            options: {
                lessLoaderOptions: {
                    lessOptions: {
                        modifyVars: {
                            '@primary-color': '#006866',
                            '@font-size-base': '16px',
                            '@menu-bg': '#006866',
                            '@menu-item-color': '#EFF6F6cc',
                            '@menu-highlight-color': 'white',
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
