const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssPlugin = require('mini-css-extract-plugin');
const path = require('path');

const mode = process.env.NODE_ENV || 'development';

const devMode = mode === 'development';

const target = devMode ? 'web' : 'browserslist';
const devtool = devMode ? 'source-map' : undefined;

module.exports = {
    mode,
    target,
    devtool,
    devServer: {
        port: 3000,
        open: true,
        hot: true,
    },
    entry: ["@babel/polyfill" ,path.resolve(__dirname, 'src', 'index.js')],
    output: {
        path: path.resolve(__dirname, 'dist'),
        clean: true,
        filename: 'index.[contenthash].js',
        assetModuleFilename: 'assets/[hash][ext]'
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: path.resolve(__dirname, 'src', 'index.html')
        }),
        new MiniCssPlugin({
            filename: 'index.[contenthash].css'
        })
    ],
    module: {
        rules: [
            {
                test: /\.html$/i,
                loader: 'html-loader'
            },
            {
                test: /\.(s|sa|sc)ss$/i,
                use: [
                    devMode ? 'style-loader' : MiniCssPlugin.loader, 
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [
                                    require('postcss-preset-env')
                                ]
                            }
                        }
                    },
                    'sass-loader'
                ],
            },
            {
                test: /\.(?:js|mjs|cjs)$/i,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-env', { targets: "defaults" }]
                        ]
                    }
                }
            },
            {
                test: /\.(woff|woff2|eot|ttf)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'fonts/[name][ext]'
                }
            },
            {
                test: /\.(jpg|png|jpeg)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'img/[name][ext]'
                },
                use: [
                    {
                        loader: 'image-webpack-loader'
                    }
                ]
            },
        ]
    }
}