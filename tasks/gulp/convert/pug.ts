import path from "path"
import { src, dest } from "gulp"
import rename from "gulp-rename"
//@ts-ignore
import pug from "gulp-pug"
//@ts-ignore
import prettier from "gulp-prettier"
//@ts-ignore
import minInline from "gulp-minify-inline"
import newer from "gulp-newer"
//@ts-ignore
import data from "gulp-data"
import fs from "fs"
import { merge } from "webpack-merge"

import { isDev } from "#tsk/getEnv"
import { gulpPug, localPublicPath, siteData } from "#root/ioinfo"
import { srcArray, addSuffixStr } from "#tsk/gulp/convert/_util"
// @ts-ignore
import htmlbeautify from "gulp-html-beautify"

export default function buildHtml(): NodeJS.ReadWriteStream {
  let stream: NodeJS.ReadWriteStream = src(srcArray(gulpPug))

  if (isDev) {
    stream = stream.pipe(newer(localPublicPath.dev))
  }

  stream = stream
    // pug のメタデータを外部で指定する機能。同じ名前のjsonファイルを設置する。
    .pipe(
      data((file: { basename: string; path: string; contents: Buffer }) => {
        const pugDataPath = path.resolve(
          path.dirname(file.path),
          `${path.basename(file.basename, path.extname(file.basename))}.json`
        )
        const pageData = !fs.existsSync(pugDataPath)
          ? {}
          : JSON.parse(
              fs.readFileSync(pugDataPath, {
                encoding: "utf8",
              })
            )

        return {
          isDev: isDev,
          pageMetaData: merge(pageData, siteData),
        }
      })
    )
    .pipe(
      pug({
        locals: gulpPug.src.baseDir,
        // @ts-ignore
        doctype: "html",
      })
    )

  stream = stream
    // .pipe(
    // 	prettier({
    // 		bracketSpacing: true,
    // 		bracketSameLine: false,
    // 		singleAttributePerLine: false,
    // 		semi: true,
    // 	})
    // )
    .pipe(
      htmlbeautify({
        indent_size: 1,
        indent_with_tabs: true,
        eol: "\n",
      })
    )
    .pipe(
      rename((path) => {
        // Updates the object in-place
        path.basename = addSuffixStr(path.basename, gulpPug)
      })
    )

  return stream.pipe(
    dest(
      path.resolve(isDev ? localPublicPath.dev : localPublicPath.prod, gulpPug.dest.dir)
    )
  )
}
