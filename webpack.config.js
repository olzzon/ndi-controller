const path = require('path')

module.exports = {
    entry: './src/client/index.tsx',
    devtool: 'inline-source-map',
    module: {
        rules: [
            { test: /\.(ts|tsx)$/,
                loader: 'ts-loader' },
            {
                test: /\.(css|scss)$/,
                use: ['style-loader', 'css-loader'],
                exclude: /\.module\.css$/,
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.jsx'],
    },
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'build/client'),
    },
}
