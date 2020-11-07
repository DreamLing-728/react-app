const {stylelint} = require('./plugin.base');

module.exports={
  mode: 'development',
  plugins: [
    ...stylelint
  ]
};