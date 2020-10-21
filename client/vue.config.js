module.exports = {
    devServer: {
        port: 5000,
        disableHostCheck: true,
        public: '0.0.0.0:5000',
        stats: {
            colors: true,
            hash: false,
            version: false,
            timings: false,
            assets: false,
            chunks: false,
            modules: false,
            reasons: false,
            children: false,
            source: false,
            errors: false,
            errorDetails: false,
            warnings: false,
            publicPath: false
          }
    },
}