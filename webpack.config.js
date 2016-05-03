module.exports = {
    entry: {
        "index":'./src/index.js',
     },
    output: {
        filename: '[name].js',
    },

    devtool: 'source-map',

    resolve:{
        modulesDirectories: ["src", "node_modules"]
    },
 
    module: {
        loaders: [{
            test: /\.js$/,
            loader: 'babel',
            exclude: /node_modules/,
            query: {
                "presets": ["es2015","stage-0", "react"],
                plugins: ["transform-object-rest-spread"]
            }
        }]
    },
    postcss: [
    ],
    plugins: [

    ]
};
