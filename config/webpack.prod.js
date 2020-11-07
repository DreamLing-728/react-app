const path = require('path');
const {stylelint, htmlPlugin} = require('./plugin.base');

module.exports={
  mode: 'production',
  output: {
    path: path.resolve(__dirname, '../build'),
    filename: 'bundle.min.js'
  },
  plugins: [
    ...stylelint,
    htmlPlugin
  ]
};