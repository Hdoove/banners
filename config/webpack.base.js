module.exports = {
    module: {
        rules: [{
            // 使用 babel-loader 来编译处理 js 和 jsx 文件
            test: /\.(js|jsx|ts|tsx)$/,
            use: "babel-loader",
            exclude: /node_modules/
        }]
    },
};