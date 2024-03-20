const HtmlWebpackPlugin = require('html-webpack-plugin');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');

const config = {
    entry: './src/index.tsx',
    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'build'),
        publicPath: '/',
        clean: true
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [{
                    loader: 'ts-loader',
                    options: { onlyCompileBundledFiles: true }
                }],
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                exclude: /\.module\.css$/, // Exclude CSS modules
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            {
                test: /\.module\.css$/, // Match CSS modules
                use: [MiniCssExtractPlugin.loader,
                {
                    loader: 'css-loader',
                    options: {
                        modules: {
                            auto: true,
                            localIdentName: '[name]__[local]--[hash:base64:5]', // Define the CSS class naming convention
                        },
                    },
                },
                ],
            },
            {
                test: /\.s[ac]ss$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
                exclude: /node_modules/,
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/,
                type: 'asset/resource',
            }
        ],
    },
    //ignoreWarnings: [
    //    {
    //        module: ,
    //        message: , 
    //    }
    //],
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        modules: [path.resolve(__dirname, './src'), 'node_modules'],
    },
    plugins: [
        new MiniCssExtractPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './src/templates/index.html'),
        }),
        //new CopyPlugin({
        //    patterns: [
        //        {
        //            from: ,
        //            to: path.resolve(__dirname, 'build/assets')
        //        }
        //    ]
        //}),
        new NodePolyfillPlugin(),
        new CleanWebpackPlugin(),
    ],
};
module.exports = config;

