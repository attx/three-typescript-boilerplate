'use strict'

// new webpack.optimize.UglifyJsPlugin({sourceMap: true, compress: true})

module.exports = {
    // devtool: 'inline-source-map',
    entry: './js/script.ts',
    output: { filename: 'js/script.js' },
    module: {
        loaders: [
            { 
                test: /\.ts(x?)$/, 
                loader: "babel-loader?presets[]=es2015!ts-loader" 
            }
        ]
    },
    resolve: {
        extensions: [ '.ts', '.tsx', '.js' ]
    }
}