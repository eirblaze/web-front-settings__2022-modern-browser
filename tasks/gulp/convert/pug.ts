import path from "path"
import { src, dest } from "gulp"
//@ts-ignore
import pug from "gulp-pug"
//@ts-ignore
import prettier from "gulp-prettier"
//@ts-ignore
import minInline from 'gulp-minify-inline'
import newer from "gulp-newer"
//@ts-ignore
import data from "gulp-data"
import fs from "fs"
import { merge } from "webpack-merge"

import { isDev } from "#tsk/getEnv"
import { gulpPug,publicPath,siteData } from "#root/ioinfo"

const srcFilesWithRoot: string[] = []
for (const srcFile of gulpPug.srcFiles) {
  srcFilesWithRoot.push(path.resolve(gulpPug.srcViewsRoot, srcFile))
}
for (const srcIgnoreFile of gulpPug.srcIgnoreFiles) {
  srcFilesWithRoot.push(`!${path.resolve(gulpPug.srcViewsRoot, srcIgnoreFile)}`)
}

export default function buildHtml(): NodeJS.ReadWriteStream {
  let stream: NodeJS.ReadWriteStream = src(srcFilesWithRoot)

  if (isDev) {
    stream = stream.pipe(newer(publicPath.dev))
  }

  stream = stream
    // pug のメタデータを外部で指定する機能。同じ名前のjsonファイルを設置する。
    .pipe(
      data((file: { basename: string; path: string; contents: Buffer }) => {
        // console.log(
        //   file,
        //   file.basename,
        //   Buffer.isBuffer(file.contents),
        //   file.path,
        //   path.resolve(
        //     path.dirname(file.path),
        //     `${path.basename(file.basename, path.extname(file.basename))}.json`
        //   )
        // )
        return {
          pageMetaData: merge(
            JSON.parse(
              fs.readFileSync(
                path.resolve(
                  path.dirname(file.path),
                  `${path.basename(
                    file.basename,
                    path.extname(file.basename)
                  )}.json`
                ),
                {
                  encoding: "utf8",
                }
              )
            ),
            siteData
          ),
          isDev: isDev,
        }
      })
    )
    .pipe(pug({
      locals: gulpPug.srcBaseDir,
    }))

  if (isDev) {
    stream = stream
    .pipe(prettier())
  } else {
    stream = stream
    .pipe(minInline())
  }

  return stream
  .pipe(dest(path.resolve(isDev ? publicPath.dev : publicPath.prod, gulpPug.dest)))
}
