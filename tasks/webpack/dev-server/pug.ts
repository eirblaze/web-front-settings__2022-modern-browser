import express from "express"
import { join as pathJoin, resolve as pathResolve } from "path"
import { promises as fsPromise } from "fs"
import { gulpPug } from "#root/ioinfo"
import { delSuffixStr } from "#root/tasks/gulp/convert/_util"

export default function (projectRoot: string) {
  const beforeStaticApp = express()
  // pug
  beforeStaticApp.set("views", gulpPug.src.baseDir)
  beforeStaticApp.set("view engine", "pug")
  beforeStaticApp.get([/(html?|\/|^)$/i], async (req, res, next) => {
    const noExtPath = req.path ? req.path.replace(/\.html?$/i, "").replace(/\/$/i, "/index") : "/index"
    // console.log("noExtPath", noExtPath)
    const pugPath = delSuffixStr(
      pathJoin("./", noExtPath).replace(
        pathJoin("./", gulpPug.dest.dir),
        ""
      ),
      gulpPug
    )

    const pugSrc = pathResolve(
      projectRoot,
      gulpPug.src.baseDir,
      pugPath.concat(".pug")
    )

    try {
      await fsPromise.readFile(pugSrc)
      console.log("pug render", pugPath, pugSrc)
      return res.render(pugPath, {
        // title: "Express.js index",
        isDev: true,
        wpIsLocal: true,
        projectRoot: projectRoot,
      })
    } catch (e) {
      next()
    }
  })
  return beforeStaticApp
}
