import { type Configuration as WpCfg } from "webpack";
// import { type Configuration as WpDevServerCfg } from "webpack-dev-server";
import merge from "webpack-merge"
import path from "path"
import { publicPath } from "#root/ioinfo"
// import devExpressJs from "./express"
// import { HotModuleReplacementPlugin } from "webpack"
import {wpCfg as wordPressProxyCfg} from "./wp-proxy"
import setupMiddlewares from "./setupMiddlewares";

// interface WpCfg extends WpCfgNeutral {
//   devServer?: WpDevServerCfg;
// }

export default function (projectRoot: string): WpCfg {

  const wpCfg: WpCfg[] = [
    {
      devServer: {
        headers: {
          "Access-Control-Allow-Origin": "*", // たまに出るCORSエラー対策
          "X-Frame-Options": "DENY", // インラインフレーム禁止設定
        },
        allowedHosts: ["localhost"],

        // サーバー設定
        static: [
          {
            directory: path.join(projectRoot, publicPath.dev),
          },
        ],
        port: 8090,
        // public            : 'localhost:8090',
        // host              : '0.0.0.0',

        // ページ設定
        // openPage          : 'index.html',
        //open: 'Chrome',

        compress: true,

        // HMR (ホットリロード) 全般設定
        hot: true,
        // watchContentBase: true, // コンテンツベースに置かれたファイル(htmlやcssなど)の変更を監視する
        // inline            : true, // オートリフレッシュ(自動再読込)をiframeモードで実行する
      },
    },
  ]

  wpCfg.push(setupMiddlewares(projectRoot))
  wpCfg.push(wordPressProxyCfg)

  return merge(wpCfg)
}
