const KotlinWebpackPlugin = require('@jetbrains/kotlin-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlBeautifyPlugin = require('html-beautify-webpack-plugin');
const LiveReloadPlugin = require('webpack-livereload-plugin');

const path = require('path');
const webpack = require ('webpack');

const devMode = (process.env.NODE_ENV !== 'production');

const devServerConfig = {
    compress: false,
    port: 9000,
    watchOptions: {
        ignored: /node_modules/
    }
};

module.exports = {
    mode: process.env.NODE_ENV || 'development',
    
    //devServer: devServerConfig,

    // Gradle:
    // entry: 'starter',
    entry: 'kotlinApp',
    resolve: {
        modules: ['kotlin_build', 'node_modules']
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                // Gradle
                // include: path.resolve(__dirname, 'build/kotlin2js'),
                include: path.resolve(__dirname, '../kotlin_build'),
                exclude: [
                    /kotlin\.js$/ // Kotlin runtime doesn't have sourcemaps at the moment
                ],
                use: ['source-map-loader'],
                enforce: 'pre'
            }
        ]
    },
    output: {
        publicPath: '',
        path: path.resolve(__dirname, 'build'),
        filename: 'build.js'
    },
    // any "source-map"-like devtool is possible
    // More: https://webpack.js.org/configuration/devtool/
    devtool: "inline-source-map",

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        // new KotlinWebpackPlugin({
        //     src: path.resolve(__dirname, 'src/main/kotlin'),
        //     verbose: true,
        //     optimize: false,
        //     metaInfo: false,                                   // Include .meta.js files
        //     sourceMaps: true,                                 // Include Source mappings
        //     librariesAutoLookup: true,
        //     packagesContents: [
        //         require(path.resolve(__dirname, 'package.json'))
        //     ],
        // }),
        new HtmlWebpackPlugin({
            filename: 'index.html',

            // Weitere Infos: https://goo.gl/wVG6wx
            template: '!!html-loader?interpolate!src/index.html',
            chunks: [ 'main', 'styles' ]
        }),
        new HtmlBeautifyPlugin({
            config: {
                html: {
                    end_with_newline: true,
                    indent_size: 2,
                    indent_with_tabs: true,
                    indent_inner_html: true,
                    preserve_newlines: true,
                    unformatted: ['p', 'i', 'b', 'span']
                }
            },
            replace: [' type="text/javascript"']
        }),
        new LiveReloadPlugin(),
    ],

    devServer: {
        port: 8080,
        disableHostCheck: true,

        historyApiFallback: true,
        hot: true,
    }
};
