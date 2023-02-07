import { src, dest } from "gulp"
import newer from "gulp-newer"
import { resolve as pathResolve } from "path"

import { gulpChromeManifest,publicPath } from "#root/ioinfo"
import { isDev } from "#tsk/getEnv"
import { plugins as postCssPlugins } from "#root/postcss.config"

export default function buildChromeManifest(): NodeJS.ReadWriteStream {
  let stream: NodeJS.ReadWriteStream = src(gulpChromeManifest.src)

  if (isDev) {
    stream = stream.pipe(newer(gulpChromeManifest.dest))
  }

  return stream
  .pipe(dest(pathResolve(isDev ? publicPath.dev : publicPath.prod, gulpChromeManifest.dest)))

}
