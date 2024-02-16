module.exports = {
  lintOnSave: false,
  runtimeCompiler: true,
  publicPath: '/academico/',
  outputDir: 'academico',
  configureWebpack: {
    resolve: {
       symlinks: false
    }
  },
  transpileDependencies: [
    '@coreui/utils',
    '@coreui/vue'
  ]
}
