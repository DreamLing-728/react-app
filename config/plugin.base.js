const path = require('path');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const STYLELINT_ENABLE=false;
const ESLINT_SWITCH=true;

module.exports={
  ESLINT_SWITCH,
  stylelint: STYLELINT_ENABLE?[new StyleLintPlugin({
    files: ['**/*.css', '**/*.less', '**/*.html', '**/*.vue', '**/*.scss']
  })]:[],
  htmlPlugin: new HtmlWebpackPlugin({
    template: path.resolve(__dirname, '../index.html'),
  })
}
