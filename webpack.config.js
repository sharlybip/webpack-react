const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const { CleanPlugin } = require('webpack');

const ruleForJavaScript = {
    test: /\.(js|jsx)$/,
    exclude: /node_modules/,
    use: {
        loader: 'babel-loader',
    }
}
const ruleForHtml = {
    test: /\.html$/,
    use:[
        {
            loader: 'html-loader'
        }
    ]
}
const ruleForCss = {
    test: /\.s[ac]ss$/,
    use: [
        'style-loader',
        'css-loader',
        'sass-loader'
    ],
    
}

const rules = [ruleForJavaScript, ruleForHtml,ruleForCss];

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    resolve: {
        extensions: ['.js','.jsx'],
        alias: {
            '@componets': path.resolve(__dirname, './src/components/'),
            '@styles': path.resolve(__dirname, './src/styles/')
        }
    },
    mode: 'production',
    module : { rules },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
            filename: 'index.html'
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css'
        }),
        new CleanPlugin(),
    ],
    optimization: {
        minimize: true,
        minimizer :[
            new CssMinimizerPlugin(),
            new TerserPlugin(),
        ]
    }
}