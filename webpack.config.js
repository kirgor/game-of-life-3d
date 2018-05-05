const path = require('path')

module.exports = {
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: 'ts-loader'
            }
        ]
    },

    resolve: {
        extensions: ['.ts']
    },

    entry: path.resolve(__dirname, 'src/index.ts'),

    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },

    mode: 'development'
}
