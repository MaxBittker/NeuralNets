var webpack = require("webpack");
var path = require("path");

module.exports = {
    entry: {
        A1: "./js/A1.js",
        A2: "./js/A2.js",
    },
    output: {
        path: path.join(__dirname, "dist"),
        filename: "[name].bundle.js"
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel-loader'
        }]
    }
};
