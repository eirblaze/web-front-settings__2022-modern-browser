import { Configuration as WpCfg } from "webpack"
import { VueLoaderPlugin } from 'vue-loader'
import { isDev } from "#tsk/getEnv"

// Vue.js
// const vue_import = 'vue' // CDN
// const vue_import = 'vue/dist/vue.runtime.esm-browser' // ES Module (バンドラ用) ランタイム限定 // vue-loader や vueify を利用する場合、 *.vue ファイルに中のテンプレートはビルド時に JavaScript に事前コンパイルされます。最終成果物の中にコンパイラは本当に必要なく、したがってランタイム限定ビルドを利用することが出来ます。ランタイム限定ビルドは完全ビルドに比べおよそ 30% 軽量なため、利用できるときにはこれを利用したほうが良いでしょう。それでもなお完全ビルドを利用したい場合は、バンドラでエイリアスを設定する必要があります。
const vue_import = isDev ? 'vue/dist/vue.runtime.esm-browser' : 'vue'

const cfg: WpCfg = {
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'sass-loader',
        ]
      },
      {
        test: /\.sass$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'sass-loader?indentedSyntax',
        ]
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
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
    {
      [vue_import]: 'Vue',
    },
  ],
  plugins: [
    new VueLoaderPlugin(),
  ],
}

export default cfg
