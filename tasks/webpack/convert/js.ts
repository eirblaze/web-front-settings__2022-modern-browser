import { Configuration as WpCfg } from "webpack"
import babelCfg from "#root/babel.config"
import { isDev } from "#tsk/getEnv"

const cfg: WpCfg = {
  module: {
    rules: [
      {
        // ローダーの処理対象ファイル
        test: /\.m?[jt]s$/,
        // 利用するローダー
        use: [
          {
            loader: "babel-loader",
            options: babelCfg(),
          },
          {
            loader: 'webpack-preprocessor-loader',
            options: {
              params: {
                isDev: isDev,
              },
            },
          },
        ],
        // ローダーの処理対象から外すディレクトリ
        exclude: /node_modules/,
      },
      {
        test: /\.pug$/,
        use: [
          {
            // https://runebook.dev/ja/docs/webpack/loaders/html-loader
            loader: 'html-loader',
          },
          {
            // https://github.com/willyelm/pug-html-loader
            loader: 'pug-html-loader',
            options: {
              // options to pass to the compiler same as: https://pugjs.org/api/reference.html
              data: {} // set of data to pass to the pug render.
            },
          }
        ],
      },
    ],
  },
}
export default cfg
