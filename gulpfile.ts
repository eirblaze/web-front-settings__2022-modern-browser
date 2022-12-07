import { parallel, watch } from "gulp"
import { nodeModuleAlias } from "./tasks/getTsCfg"
// import { resolve as pathResolve, join as pathJoin } from "path"
nodeModuleAlias(__dirname)

import { gulpCssSrcRoot,gulpCss,gulpPugSrcBaseDir,gulpPug } from "#root/ioinfo"
import cssTask from "#tgp/convert/css"
import pugTask from "#tgp/convert/pug"
import genSiteMapTask from "#tgp/generateSitemap"
import path from "path"

export const css = cssTask
export const pug = pugTask
export const sitemap = genSiteMapTask
export const all = parallel([cssTask, pugTask, genSiteMapTask])

// watch mode
const watchDir : string[] = []
const pathSearch = /\/{2,}/
const pathReplace = "/"
// css
for (const watchSingle of gulpCss.watch) {
  watchDir.push((gulpCssSrcRoot + "/" + watchSingle).replace(pathSearch,pathReplace))
}
// html
for (const watchSingle of gulpPug.watch) {
  watchDir.push((gulpPugSrcBaseDir + "/" + watchSingle).replace(pathSearch,pathReplace))
}
export const watcher = () => watch(watchDir, all)
