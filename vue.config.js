const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})

//自动按需导入
const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver, NaiveUiResolver } = require('unplugin-vue-components/resolvers')

module.exports = {
  configureWebpack: {
    plugins: [
      AutoImport({
        resolvers: [
          ElementPlusResolver(),
          NaiveUiResolver(),
        ]
      }),
      Components({
        resolvers: [
          ElementPlusResolver(),
          NaiveUiResolver()
        ]
      })
    ]
  }
}




