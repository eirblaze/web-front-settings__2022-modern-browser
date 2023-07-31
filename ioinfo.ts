import { Configuration as WpCfg } from "webpack"
import { resolve as pathResolve } from "path"

// 共通

export const extensions = [".ts", ".tsx", ".js", ".jsx", ".json", ".pug"]

export const localPublicPath = {
  dev:  "./dev-public",
  prod: "./production-public",
}

// WebPack

export const wpSrc = [
  {
    name: "s1-main",
    file: "src/ts/webpack/service1-main.ts",
  },
  {
    name: "s2-main",
    file: "src/ts/webpack/service2-main.ts",
  },
]
export const wpIo: WpCfg = {
  output: {
    filename: "assets/js/[name].js",

    // dynamic import
    publicPath: "https://example.com/pages/",
    // chunkFormat: "array-push",
  },
  target: ['webworker', "es2020"],
}
export const libName: string | "" = ""

// バンドルに含めないもの
export const externals: WpCfg = {
  externals: [
    /^(jquery|\$)$/i,
    // /^firebase($|\/.+$)/i,
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

export interface GulpCfg {
  src: {
    baseDir: string
    files: string[]
    ignoreFiles: string[]
  }
  dest: {
    dir: string
    suffix?: {
      str: string
      ignore: RegExp
    }
  }
  watch: string[]
}

// sass
export const gulpCss: GulpCfg = {
  watch: ["**/*.sass", "**/*.scss"],
  src: {
    baseDir: "./src/sass/",
    files: [
      "index.sass",
    ],
    ignoreFiles: [],
    // pathResolve(gulpCssSrcRoot, "index.sass")
  },
  dest: {
    dir: "assets/css",
  }
}

// pug
export const gulpPug: GulpCfg = {
  watch: ["**/*.pug", "**/*.json", "../lib/**/*.*"],
  src: {
    baseDir: "./src/pug/views/",
    files: [
      "**/*.pug",
    ],
    ignoreFiles: [
    ]
  },
  dest: {
    dir: "./",
  },
}

// sitemap gen
export const siteData = {
  pageNameSuffix: "Example - example.com"
}
export const siteMap = {
  exist: true,
  src: "./tasks/gulp/sitemap.json",
  dest: "assets/data",
}
