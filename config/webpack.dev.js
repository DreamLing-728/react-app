const path=require('path');
const {stylelint, htmlPlugin}=require('./plugin.base');

module.exports = {
    mode: 'development', // 仅开发
    output: { // 仅开发
        filename: 'bundle.js'
    },
    devtool: 'source-map', // 仅开发
    plugins: [
      ...stylelint,
      htmlPlugin
    ],
    devServer: { // 仅开发
        contentBase: path.resolve(__dirname, '../'),
        compress: true,
        port: 5555,
        open: true,
        proxy: {
            '/s': 'http://localhost:5556'
        }
    }
};