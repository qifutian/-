const path = require('path');
const CracoAntDesignPlugin = require("craco-antd");
const CracoLessPlugin = require("craco-less");
const eslintConfigure = require("./.eslintrc");

module.exports = {
    eslint: {
        configure: eslintConfigure
    },
    plugins: [
        {
            plugin: CracoAntDesignPlugin,
            options: {
                customizeThemeLessPath: path.join(
                    __dirname,
                    "src/style/AntDesign/customTheme.less"
                )
            }
        },
        {
            plugin: CracoLessPlugin
        }
    ],
    webpack: {
        alias: {
            'src': path.resolve(__dirname, 'src'),
            'containers': path.resolve(__dirname, 'src/containers'),
            'reducers': path.resolve(__dirname, 'src/reducers')
        }
    }
};
