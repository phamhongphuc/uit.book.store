const path = require('path');

module.exports = {
    module: {
        rules: [{
            test: /\.vue$/,
            use: [{
                loader: 'vue-loader',
            }, {
                loader: 'vue-import-loader',
            }]
        }, {
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            include: [path.join(__dirname, 'src')],
        }, {
            test: /\.(png|jpg|gif|svg)$/,
            loader: 'file-loader',
            options: {
                name: '[name].[ext]?[hash]',
            },
        }, {
            test: /\.json$/,
            use: 'json-loader',
        }]
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src/renderer/vue'),
            '#': path.resolve(__dirname, './src/renderer/modules'),
        },
        extensions: ['.js', '.vue', '.json'],
        modules: [
            path.join(__dirname, '../../node_modules'),
            path.resolve(__dirname, './modules')
        ],
    },
};