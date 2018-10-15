const KotlinWebpackPlugin = require('@jetbrains/kotlin-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlBeautifyPlugin = require('html-beautify-webpack-plugin');
const LiveReloadPlugin = require('webpack-livereload-plugin');

const path = require('path');


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
    
    devServer: devServerConfig,
    entry: 'kotlinApp',
    module: {
        rules: [
            {
                test: /\.pug$/,
                use: 'pug-loader'
            },
            {
                test: /\.js$/,
                include: path.resolve(__dirname, '../kotlin_build'),
                exclude: [
                    /kotlin\.js$/ // Kotlin runtime doesn't have sourcemaps at the moment
                ],
                use: ['source-map-loader'],
                enforce: 'pre'
            }
        ]
    },
    resolve: {
        modules: ['kotlin_build', 'node_modules']
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'js/build.js'
    },
    // any "source-map"-like devtool is possible
    // More: https://webpack.js.org/configuration/devtool/
    devtool: "inline-source-map",
    
    plugins: [
        new KotlinWebpackPlugin({
            src: path.resolve(__dirname, 'src/kt'),
            verbose: true
        }),
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
    ]
};
