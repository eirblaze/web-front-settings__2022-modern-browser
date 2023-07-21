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
    {
      react: "React",
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
