const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

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
    mode: 'development',
    resolve: {
        extensions: ['.js','.jsx']
    },
    module : { rules },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
            filename: 'index.html'
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css'
        })
    ],
    devServer: {
        static: path.join(__dirname, 'dist'),
        compress: true,
        port: 3006,
    }
}