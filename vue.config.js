module.exports = {
    configureWebpack: {
        devServer: {
            proxy: {
                "/apiCall": {
                "target": 'https://rsc.radixu.com',
                "pathRewrite": { '^/apiCall': '' },
                "changeOrigin": true,
                "secure": false
                }
            }
        }
    }
};
