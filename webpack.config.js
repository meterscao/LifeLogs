const path = require("path")
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    entry: {
        index: path.resolve(__dirname, "src", "script", "main.js")
    },
    output: {
        path: path.resolve(__dirname, "public")
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "public", "index.html")
        })
    ],
    module:{
        rules:[
            {
                test:/\.less$/,
                use:["style-loader",
                "css-loader",
                "postcss-loader",
                "less-loader"
            ]
            }
        ]
    }
}