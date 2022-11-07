const path = require('path')

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

CATALOG_SRC = path.resolve(__dirname, 'src')
CATALOG_PROD = path.resolve(__dirname, 'prod')

module.exports = {
    entry: path.resolve(CATALOG_SRC, "index.js"),
    output: {
        path: CATALOG_PROD,
        filename: 'bundle.js',
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "Development",
            template: path.resolve(CATALOG_SRC, 'index.html'),
            inject: 'body',
            minify: false
        }),
    ],
    module: {
        rules: [
            {
                test: /\.scss$/i,
                use: [
                    "style-loader",
                    "css-loader",
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [
                                    [
                                        "autoprefixer",
                                        {
                                            path: 'postcss.config.js'
                                        },
                                    ],
                                ],
                            },
                        },
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            sourceMap: true,
                            sassOptions: {
                                outputStyle: "expanded",
                            },
                        },
                    },
                ],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'images/[name][ext]'
                }
            },
            {
                test: /\.ttf$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'fonts/[name][ext]'
                }
            }
        ],
    },
};