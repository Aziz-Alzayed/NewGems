const fs = require('fs');
const path = require('path');
const commonConfig = require('./webpack.common.js');
const Dotenv = require('dotenv-webpack');
const { merge } = require("webpack-merge");

const prodConfig = {
    mode: "none",
    performance: {
        hints: false
    },
    devtool: 'source-map',
    plugins: [
        new Dotenv({
            "path": ".env.uat"
        }),
    ],
};

module.exports = merge(commonConfig, prodConfig);