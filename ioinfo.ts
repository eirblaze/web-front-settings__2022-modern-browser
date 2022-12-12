import { Configuration as WpCfg } from "webpack"
import { resolve as pathResolve } from "path"

// 共通

export const extensions = [".ts", ".tsx", ".js", ".jsx", ".json", ".pug"]

export const publicPath = {
  dev:  "./dev-public",
  prod: "./production-public",
}

// WebPack

export const wpSrc = [
  {
    name: "main",
    file: "src/ts/webpack/wp-main.ts",
  },
]
export const wpIo: WpCfg = {
  output: {
    filename: "assets/js/[name].js",
  },
}
export const libName: string | "" = ""

// バンドルに含めないもの
export const externals: WpCfg = {
  externals: [
    /^(jquery|\$)$/i,
    /^react$/i,
    {
      "react-dom/client": "ReactDOM",
    },
    /^mathjax/i,
    // /^@pug\/lib\/data\/scheduler/, // @ 書式はサポートしていない
    // {
    //   firebase: {
    //     // root: ライブラリはグローバル変数として使用できる必要があります (例: スクリプトタグを使用)。
    //     root: [
    //       "firebase",
    //       "firebase/app",
    //       "firebase/analytics",
    //     ]
    //   }
    // },
    // ({ context, request }, callback) => {
    //   if (request && /^firebase($|\/.+$)/i.test(request)) {
    //     return callback(undefined, `root ${request}`)
    //   }
    //   callback()
    // },
  ],
}

// gulp

interface GulpCfg {
  src: string | string[]
  dest: string
  watch: string[]
}

// sass
export const gulpCssSrcRoot = "./src/sass/"
export const gulpCss: GulpCfg = {
  watch: ["**/*.sass", "**/*.scss"],
  src: pathResolve(gulpCssSrcRoot, "index.sass"),
  dest: "assets/css",
}

// pug
export const gulpPugSrcBaseDir = "./src/pug/"
const gulpPugSrcViewsRoot = gulpPugSrcBaseDir + "views/"
export const webpackDevServerPugView = {
  indexPath: gulpPugSrcViewsRoot,
}
export const gulpPug = {
  watch: ["**/*.*"],
  srcBaseDir: gulpPugSrcBaseDir,
  srcViewsRoot: gulpPugSrcViewsRoot,
  srcFiles: [
    "**/*.pug",
  ],
  srcIgnoreFiles: [
    "lib/*.pug",
  ],
  dest: "./",
}

// sitemap gen
export const siteData = {
  pageNameSuffix: "Example - example.com"
}
export const siteMap = {
  src: "./tasks/gulp/sitemap.json",
  dest: "assets/data",
}
