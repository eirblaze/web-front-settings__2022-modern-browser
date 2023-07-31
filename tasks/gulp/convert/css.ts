import { src, dest } from "gulp"
import sassCompiler from "node-sass"
import gulpSass from "gulp-sass"
import postCss from "gulp-postcss"
import sourceMap from "gulp-sourcemaps"
import newer from "gulp-newer"
import { resolve as pathResolve } from "path"
import rename from "gulp-rename"

import { gulpCss, localPublicPath } from "#root/ioinfo"
import { isDev } from "#tsk/getEnv"
import { plugins as postCssPlugins } from "#root/postcss.config"
import { srcArray, addSuffixStr } from "#tsk/gulp/convert/_util"

const sass = gulpSass(sassCompiler)

export default function buildSass(): NodeJS.ReadWriteStream {
  let stream: NodeJS.ReadWriteStream = src(srcArray(gulpCss))

  if (isDev) {
    stream = stream.pipe(newer(gulpCss.dest.dir)).pipe(sourceMap.init())
  }

  stream = stream
    .pipe(
      rename((path) => {
        // Updates the object in-place
        path.basename = addSuffixStr(path.basename, gulpCss)
      })
    )
    .pipe(sass().on("error", sass.logError))
    .pipe(postCss(postCssPlugins()))

  if (isDev) {
    stream = stream.pipe(sourceMap.write("./"))
  }

  return stream.pipe(
    dest(
      pathResolve(isDev ? localPublicPath.dev : localPublicPath.prod, gulpCss.dest.dir)
    )
  )
}
