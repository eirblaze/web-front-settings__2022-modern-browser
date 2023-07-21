import { parallel, watch } from "gulp"
import { nodeModuleAlias } from "./tasks/getTsCfg"
// import { resolve as pathResolve, join as pathJoin } from "path"
nodeModuleAlias(__dirname)

import { gulpCss,gulpPug, type GulpCfg } from "#root/ioinfo"
import cssTask from "#tgp/convert/css"
import pugTask from "#tgp/convert/pug"
import chromeManifest from "#tgp/convert/chromeManifest"
import genSiteMapTask from "#tgp/generateSitemap"
import {join as pathJoin} from "path"

export const css = cssTask
export const pug = pugTask
export const mf = chromeManifest
export const sitemap = genSiteMapTask
export const all = parallel([chromeManifest, cssTask, pugTask, genSiteMapTask])

// watch mode
const watchDir : string[] = []
function genWatchPath(gulpCfg: GulpCfg) {
  return gulpCfg.watch.map(srcStr=>pathJoin(gulpCfg.src.baseDir, srcStr).replace(/[/\\]+/g, "/"))
}

watchDir.push(...genWatchPath(gulpCss))
watchDir.push(...genWatchPath(gulpPug))

export const watcher = () => {
  console.log("watchDir", watchDir)
  return watch(watchDir, all)
}
