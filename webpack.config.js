const {ESLINT_SWITCH} = require('./config/plugin.base');

module.exports=function (env={}, argv){
  let config = null;

  if(env.dev){          //开发模式
    config=require('./config/webpack.dev');
  }else if(env.prod){   //生产模式
    config=require('./config/webpack.prod');
  }else{                //测试
    config=require('./config/webpack.test');
  }
  
  return {
        entry: './src/index', // 公用
        module: { // 公用
            rules: [
                // 处理 jsx
                {
                    test: /\.(jsx|js)$/i,
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: 'babel-loader',
                            options: {
                                presets: [
                                    '@babel/preset-react'
                                ]
                            }
                        },
                        // 5.1增加ESlint loader
                        ...ESLINT_SWITCH?[ // 5.1.2添加eslint开关
                            {
                                loader: 'eslint-loader',
                                options: {
                                    // 什么都不写，输出到命令行
                                    // 5.1.1 增加report输出模式，在eslint\lib\formatters文件夹下
                                    outputReport: {
                                        filePath: 'eslint_report.html',
                                        formatter: require('eslint/lib/formatters/html')
                                    }
                                }
                            }
                        ]:[]
                    ]
                },
                // 处理css
                {
                    test: /\.css$/i,
                    use: [
                        'style-loader',
                        'css-loader',
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: [
                                    require('autoprefixer')
                                ]
                            }
                        }
                    ]
                },
                // 处理图片
                {
                    test: /\.(png|jpg|gif)/,
                    use: {
                        loader: 'url-loader',
                        options: {
                            outputPath: 'imgs/',
                            limit: 10*1024
                        }
                    }
                },
                // 处理字体
                {
                    test: /\.(eot|svg|ttf|woff|woff2)$/i,
                    use: {
                        loader: 'url-loader',
                        options: {
                            outputPath: 'fonts/',
                            limit: 10*1024
                        }
                   }
                },
                // 处理less
                {
                    test: /\.less$/i,
                    use: [
                        'style-loader',
                        'css-loader',
                        'less-loader'
                    ]
                }
            ]
        },
        ...config
    };
}