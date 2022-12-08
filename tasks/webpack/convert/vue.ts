import { Configuration as WpCfg } from "webpack"
const { VueLoaderPlugin } = require('vue-loader')
import { isDev } from "#tsk/getEnv"

// Vue.js
// const vue_import = 'vue' // CDN
// const vue_import = 'vue/dist/vue.runtime.esm-browser' // ES Module (バンドラ用) // vue-loader や vueify を利用する場合、 *.vue ファイルに中のテンプレートはビルド時に JavaScript に事前コンパイルされます。最終成果物の中にコンパイラは本当に必要なく、したがってランタイム限定ビルドを利用することが出来ます。ランタイム限定ビルドは完全ビルドに比べおよそ 30% 軽量なため、利用できるときにはこれを利用したほうが良いでしょう。それでもなお完全ビルドを利用したい場合は、バンドラでエイリアスを設定する必要があります。
const vue_import = isDev ? 'vue/dist/vue.runtime.esm-browser' : 'vue'
const externalsOption = []
externalsOption[vue_import] = 'Vue'

const cfg: WpCfg = {
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            scss: 'vue-style-loader!css-loader!sass-loader', // <style lang="scss">
            sass: 'vue-style-loader!css-loader!sass-loader?indentedSyntax' // <style lang="sass">
          }
        }
      },
    ]
  },
  resolve: {
    // aliasの設定をすることで `import Vue from 'vue/dist/vue';` を `import Vue from 'vue';` とかけるようになる。 https://qiita.com/es-row/items/12213f097d0762fa33bf
    alias: {
      'vue$': vue_import
    },

    // extentionsに「.vue」を追加することでimportの際に拡張子を省略して記述できるようにる。 https://qiita.com/es-row/items/12213f097d0762fa33bf
    // in webpack 2.2 default resolve .js .json - https://github.com/vuejs/vue-loader/issues/685
    extensions: ['.vue']
  },
  externals: [
    externalsOption as any,
  ],
  plugins: [
    new VueLoaderPlugin(),
  ],
}

export default cfg