module.exports = {
    entry: "./nets.js",
    output: {
        path: __dirname,
        filename: "bundle.js"
    },
    module: {
        loaders: [{
            test: "nets.js",
            loader: 'babel-loader'
        }]
    }
};
