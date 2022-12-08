import { Configuration as WpCfg, WebpackPluginInstance } from "webpack"
import { resolve as pathResolve } from "path"
import merge from "webpack-merge"
import { nodeModuleAlias, wpAlias } from "./tasks/getTsCfg"
nodeModuleAlias(__dirname)

// plugin
import TerserPlugin from "terser-webpack-plugin"

//@ts-ignore
import BundleAnalyzerPlugin from "webpack-bundle-analyzer"

//@ts-ignore
import DuplicatePackageCheckerPlugin from "duplicate-package-checker-webpack-plugin"

// import TsconfigPathsPlugin from "tsconfig-paths-webpack-plugin"

// tasks
import devServer from "#twp/dev-server"
import jsCfg from "#twp/convert/js"
import vueCfg from "#twp/convert/vue"

// get env
import * as ioinfo from "#root/ioinfo"
import { isDev, analyze } from "./tasks/getEnv"

export default function (env: any, argv: any): WpCfg {
  // set env
  // console.log("env",env)
  // console.log("argv",argv)
  const wpIsLocal = argv.env != undefined && argv.env.WEBPACK_SERVE == true
  // console.log("wpIsLocal", wpIsLocal)

  // init
  const wpOptions: WpCfg[] = []

  // dev tools
  wpOptions.push({
    mode: isDev ? "development" : "production", // production は Tree Shaking も自動実行される。
  })
  if (isDev) {
    wpOptions.push({
      devtool: !isDev ? false : wpIsLocal ? "eval-cheap-source-map" : "eval", // ソースマップスタイル設定。ビルド、リビルドの速度に関係する。 - https://webpack.js.org/configuration/devtool/
    })
  }

  // IO
  wpOptions.push(ioinfo.wpIo)

  // entry組み立て。__dirnameと組み合わせる。
  const entry: WpCfg["entry"] = {}
  for (const srcSingle of ioinfo.wpSrc) {
    entry[srcSingle.name] = [pathResolve(__dirname, srcSingle.file)]
  }
  wpOptions.push({
    entry: entry
  })

  // webpack dev server
  wpOptions.push({
    output: {
      path: pathResolve(__dirname, isDev ? ioinfo.publicPath.dev : ioinfo.publicPath.prod),
    },
  })

  // lib mode
  if (ioinfo.libName != "") {
    wpOptions.push({
      output: {
        library: ioinfo.libName,
        libraryTarget: "var",
      },
      externals: [ioinfo.libName],
    })
  }

  // externals
  wpOptions.push(ioinfo.externals)

  // dev server
  if (wpIsLocal) {
    wpOptions.unshift(devServer(__dirname))
  }

  // convert
  wpOptions.push(jsCfg)
  wpOptions.push(vueCfg)

  // 重複パッケージチェック https://www.npmjs.com/package/duplicate-package-checker-webpack-plugin
  wpOptions.push({
    plugins: [new DuplicatePackageCheckerPlugin() as WebpackPluginInstance],
  })

  // minify
  wpOptions.push({
    optimization: {
      minimize: !isDev, // dev-server HMR と競合するため注意。開発モードでは切っておく。
      minimizer: [
        new TerserPlugin({
          parallel: true,
          terserOptions: {
            // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
            compress: {
              drop_console: true,
            },
          },
          // minify: TerserPlugin["esbuildMinify"],
        }),
      ],
    },
  })

  // path resolve
  wpOptions.push({
    resolve: {
      // plugins: [
      //   new TsconfigPathsPlugin({
      //     configFile: "./tsconfig-for-tasks.json",
      //   }) as any,
      // ],
      alias: wpAlias(__dirname),
      extensions: ioinfo.extensions,
    },
  })

  // analyze
  if (analyze) {
    wpOptions.push({
      plugins: [new BundleAnalyzerPlugin() as WebpackPluginInstance],
    })
  }

  // console.log("webpack mergedOptions",merge(wpOptions))
  return merge(wpOptions)
}
