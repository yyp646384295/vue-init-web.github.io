const {defineConfig} = require('@vue/cli-service')
const CompressionPlugin = require('compression-webpack-plugin');


const path = require('path') // 引入node的路径处理模块
function resolve(dir) {
    // __dirname 项目根目录的绝对路径
    return path.join(__dirname, dir)
}

const port = process.env.PORT || 8080 // 端口
console.log(port,'process.env')
const name = process.env.VUE_APP_TITLE || 'title'; // 网页标题

module.exports = defineConfig({
    publicPath: './',
    outputDir: 'dist',
    assetsDir: 'static',
    lintOnSave: false,
    productionSourceMap: false,
    transpileDependencies: true,
    devServer: {
        host: '0.0.0.0',
        port: port,
        open: false,
        proxy: {
            // detail: https://cli.vuejs.org/config/#devserver-proxy
            [process.env.VUE_APP_URL]: {
                target: 'http://120.25.103.159',
                // target: 'http://183.250.188.126:1880',
                changeOrigin: true,
            }
        },
        allowedHosts: 'all'
    },
    chainWebpack(config) {
        // set svg-sprite-loader
        config.module
            .rule('svg')
            .exclude.add(resolve('src/assets/svgIcon'))
            .end()
        config.module
            .rule('icons')
            .test(/\.svg$/)
            .include.add(resolve('src/assets/svgIcon'))
            .end()
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({
                symbolId: 'icon-[name]'
            })
            .end()
    },
    pluginOptions: {
        'style-resources-loader': {
            preProcessor: 'sass',
            patterns: [path.resolve(__dirname, './src/assets/css/_variable.scss')],
        },
    },
    configureWebpack: {
        name: name,
        devtool: "source-map",
        resolve: {
            alias: {
                '@': resolve('src'),
            },
        },
        plugins: [
            new CompressionPlugin({
                test: /\.(js|css|html)?$/i, // 压缩文件格式 /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i
                filename: '[path].gz[query]', // 压缩后的文件名
                algorithm: 'gzip', // 使用gzip压缩
                minRatio: 0.8, // 压缩率小于1才会压缩
            }),
        ],
    },
    css: {
        loaderOptions: {
            postcss: {
                postcssOptions: {
                    plugins: [
                        // 把px单位换算成rem单位
                        require("postcss-pxtorem")({
                            rootValue: 192, // 换算的基数 375的设计稿，换算基数就是37.5 ,本项目是1920，则192
                            propList: ["*"], //可以从px更改为rem的属性。
                            // selectorBlackList: [".el"],// 要忽略的选择器并保留为px。
                            minPixelValue: 2 // 设置要替换的最小像素值。
                        })
                    ]
                }
            },
        }
    }
})
