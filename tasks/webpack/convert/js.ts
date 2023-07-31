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
    ],
  },
}
export default cfg
