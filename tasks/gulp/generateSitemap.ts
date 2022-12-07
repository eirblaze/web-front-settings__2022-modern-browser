import dirTree from "directory-tree"
import { gulpPug,siteMap,publicPath,siteData } from "#root/ioinfo"
import { merge } from "webpack-merge"
import fs from "fs"
import path from "path"
import gulp from "gulp"
import header from "gulp-header"
import { isDev } from "#tsk/getEnv"
import { sitemap } from "#root/gulpfile"

export default async function generateSitemap() {
  const getFileList = async function (rootDir:string, externalDir = {}) {
    const files = await fs.promises.readdir(rootDir)
    const currentDirMap = {
      dir: {},
      file: {},
    }
    for (const file of files) {
      const currentFilePath = path.resolve(rootDir, file)
      const stat = await fs.promises.stat(currentFilePath)
      if (stat.isDirectory()) {
        if (file in externalDir) continue
        currentDirMap.dir[file] = await getFileList(currentFilePath, externalDir)
        continue
      }
      if (path.extname(currentFilePath) == ".json") {
        currentDirMap.file[path.basename(file, path.extname(currentFilePath))] =
          JSON.parse(
            await fs.promises.readFile(currentFilePath, { encoding: "utf8" })
          )
        continue
      }
    }
    return currentDirMap
  }

  siteData["siteMap"] = await getFileList(gulpPug.srcViewsRoot, {
    lib:""
  })

  return await gulp
    .src(siteMap.src)
    .pipe(header(JSON.stringify(siteData)))
    .pipe(gulp.dest(path.resolve(isDev ? publicPath.dev : publicPath.prod, siteMap.dest)))

  // const maps = []
  // const filteredTree = dirTree(
  //   gulpPug.srcRoot,
  //   { extensions: /\.json$/ },
  //   (item, PATH, stats) => {
  //     maps[PATH] = JSON.parse(fs.readFileSync(PATH, { encoding: "utf8" }))
  //   }
  // )
  // console.log(filteredTree)
}
