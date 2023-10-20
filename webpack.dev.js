const path = require('path')//引入内置path方便得到绝对路径
const HtmlWebpackPlugin = require('html-webpack-plugin')//引入模板组件

module.exports = {
    mode: 'development',//开发模式
    entry: './src/main.tsx',//入口文件地址
    output: {
        path: path.resolve(__dirname, "./dist"),//出口文件，即打包后的文件存放地址
        filename: 'bundle.js' //文件名
    },
    devServer: {
        hot: true
    },
    devtool: 'cheap-module-source-map',
    resolve: {
        extensions:['.ts', '.js', '.cjs', '.json','tsx'], //配置文件引入时省略后缀名
        alias: {
            '@': path.resolve(__dirname, './src')
        }
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/, //匹配规则 以ts结尾的文件
                loader: 'ts-loader' //对应文件采用ts-loader进行编译
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({ 
            template: './index.html' //使用模板地址
        })
    ],
    
}
