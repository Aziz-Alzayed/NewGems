const fs = require('fs');
const path = require('path');
const commonConfig = require('./webpack.common.js');
const Dotenv = require('dotenv-webpack');
const { merge } = require("webpack-merge");
const TerserPlugin = require('terser-webpack-plugin');

const prodConfig = {
    mode: "production",
    performance: {
        hints: false
    },
    devtool: 'source-map',
    optimization: {
        splitChunks: {
            minSize: 10000,
            maxSize: 250000,
        },
        minimize: true,
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    ecma: 6,
                    compress: true,
                    output: {
                        comments: false,
                    },
                },
            }),
        ]
    },
    plugins: [
        new Dotenv({
            "path": ".env"
        }),
    ],
};

module.exports = merge(commonConfig, prodConfig);