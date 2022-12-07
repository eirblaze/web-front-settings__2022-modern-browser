import { src, dest } from "gulp"
import sassCompiler from "node-sass"
import gulpSass from "gulp-sass"
import postCss from "gulp-postcss"
import sourceMap from "gulp-sourcemaps"
import newer from "gulp-newer"
import { resolve as pathResolve } from "path"

import { gulpCss,publicPath } from "#root/ioinfo"
import { isDev } from "#tsk/getEnv"
import { plugins as postCssPlugins } from "#root/postcss.config"

const sass = gulpSass(sassCompiler)

export default function buildSass(): NodeJS.ReadWriteStream {
  let stream: NodeJS.ReadWriteStream = src(gulpCss.src)

  if (isDev) {
    stream = stream.pipe(newer(gulpCss.dest)).pipe(sourceMap.init())
  }

  stream = stream
    .pipe(sass().on("error", sass.logError))
    .pipe(postCss(postCssPlugins()))

  if (isDev) {
    stream = stream
    .pipe(sourceMap.write())
  }

  return stream
  .pipe(dest(pathResolve(isDev ? publicPath.dev : publicPath.prod, gulpCss.dest)))

}
