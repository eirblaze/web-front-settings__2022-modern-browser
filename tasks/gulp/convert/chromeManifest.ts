import { src, dest } from "gulp"
import newer from "gulp-newer"
import { resolve as pathResolve } from "path"

import { chromeManifest,publicPath } from "#root/ioinfo"
import { isDev } from "#tsk/getEnv"
import { plugins as postCssPlugins } from "#root/postcss.config"

export default function buildChromeManifest(): NodeJS.ReadWriteStream {
  let stream: NodeJS.ReadWriteStream = src(chromeManifest.src)

  if (isDev) {
    stream = stream.pipe(newer(chromeManifest.dest))
  }

  return stream
  .pipe(dest(pathResolve(isDev ? publicPath.dev : publicPath.prod, chromeManifest.dest)))

}
