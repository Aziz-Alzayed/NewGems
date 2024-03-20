const fs = require('fs');
const path = require('path');
const { merge } = require("webpack-merge");
const commonConfig = require('./webpack.common.js');
const Dotenv = require('dotenv-webpack');

const devConfig = {
    mode: "development",
    devtool: 'inline-source-map',
    devServer: {
        static: './build',
        port: 3008,
        server: {
            type: 'https',
            options: {
                key: fs.readFileSync(path.resolve(__dirname, 'cert/key.pem')),
                cert: fs.readFileSync(path.resolve(__dirname, 'cert/cert.pem'))
            }
        },
        historyApiFallback: true
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'build'),
        publicPath: '/',
        clean: true
    },
    plugins: [
        new Dotenv({
            "path": ".env.local"
        }),
    ],
};

module.exports = merge(commonConfig, devConfig);