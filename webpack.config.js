'use strict';

let webpack = require('webpack');
let ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: __dirname + '/src/scripts/main.js',
    output: {
        path: __dirname + '/build/',
        publicPath: './',
        filename: "[name].bundle.js"
    },

    watch: true,   

    watchOptions: {
        aggregateTimeout: 100   
    },

    devtool: "source-map",

    module: {
        loaders:[{
            test   : /\.js$/,
            exclude: /(node_modules|bower_components)/,             
            loader : 'babel',                                   
            query  : {
              presets: ['es2015','react'],
              plugins: ['transform-runtime']
            }
        },
        {
            test  : /\.css$/, 
            loader: 'style!css!autoprefixer!resolve-url'
        },
        {
            test  : /\.scss$/, 
            loader: ExtractTextPlugin.extract('style','css!autoprefixer!resolve-url!sass?sourceMap')
        },
        {
            test  : /\.(png|jpg|svg|ttf|eot|woff|woff2)$/,
            loader: 'url?name=images/[name].[ext]&limit=10000' 
        }]
    },

    // Плагины
    plugins: [
        // // Выделение общей части модулей и создание отдельного файла, для того чтобы браузер доставал общее с кеша а не 
        // // качал заново. (Теперь в index.html надо подключить и commom.js и [name].js) РАСКОММЕНТИТЬ ЕСЛИ ВХОДНЫХ ФАЙЛОВ > 1
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: "common"
        // })

        // Плагин для того чтобы собирать стили в файл, а не подключать через <style></style>
        new ExtractTextPlugin('styles.css')
    ],   
}

