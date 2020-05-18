const path = require('path');
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

/**
 * `..` Since this config file is in the config folder so we need
 * to resolve path in the top level folder.
 */
const resolve = relativePath => path.resolve(__dirname, '..', relativePath);

module.exports = {
    mode: 'development',
    entry: resolve('src/index.ts'),
    output: {
        filename: 'app.js',
        path: resolve('dist'),
    },
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.scss$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
                options: {
                    appendTsSuffixTo: [/\.vue$/],
                }
            }
        ]
    },
    devServer: {
        // The url you want the webpack-dev-server to use for serving files.
        host: '0.0.0.0',
        // Can be the popular 8080 also.
        port: 8010,
        // gzip compression
        compress: true,
        // Open the browser window, set to false if you are in a headless browser environment.
        open: false,
        // Reload for code changes to static assets.
        watchContentBase: true,
    },
    plugins: [
        // make sure to include the plugin!
        new VueLoaderPlugin(),
        new webpack.NamedModulesPlugin(),
        // Exchanges, adds, or removes modules while an application is running, without a full reload.
        new webpack.HotModuleReplacementPlugin(),
    ],
    resolve: {
        extensions: [ '*', '.vue', '.tsx', '.ts', '.js' ],
        alias: {
            'vue$': 'vue/dist/vue.esm.js' // 'vue/dist/vue.common.js' for webpack 1
        }
    },
    // webpack outputs performance related stuff in the browser.
    performance: {
        hints: false,
    }
};