const  HtmlWebpackPlugin =require('html-webpack-plugin');

module.exports = {
    entry: './src/teams-front.js',
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            }
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },
    output: {
        path: __dirname + '/build',
        publicPath: '/',
        filename: 'app.js'
    },
    plugins: [
      new HtmlWebpackPlugin({
          template: 'index.html'
      })
    ],
    devServer: {
        contentBase: './build'
    }
};