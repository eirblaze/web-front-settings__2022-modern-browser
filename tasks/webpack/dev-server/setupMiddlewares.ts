import { Configuration as WpCfgNeutral } from "webpack"
//@ts-ignore
import { Configuration as WpDevServerCfg } from "webpack-dev-server"
import { gulpPug } from "#root/ioinfo"
// import superstatic from "superstatic"
// import firebaseCfgGetter from 'firebase-tools/lib/config'
import express from "express"
import { join as pathJoin, resolve as pathResolve } from "path"
import { promises as fsPromise } from "fs"
import { delSuffixStr } from "#root/tasks/gulp/convert/_util"

interface WpCfg extends WpCfgNeutral {
  devServer?: WpDevServerCfg
}

// const firebaseCfg = firebaseCfgGetter.load({ cwd: process.cwd() })

export default function (projectRoot: string): WpCfg {
  return {
    devServer: {
      setupMiddlewares: (middlewares, devServer) => {
        const beforeStaticApp = express()
        const afterStaticApp = express()

        // firebase共存設定
        // beforeStaticApp.use(superstatic({ config: firebaseCfg.data.hosting }))

        // pug
        beforeStaticApp.set("views", gulpPug.src.baseDir)
        beforeStaticApp.set("view engine", "pug")
        beforeStaticApp.get(["*.html", "*.htm"], async (req, res, next) => {
          const pugPath = delSuffixStr(
            pathJoin("./", req.path.replace(/\.html?$/i, "")).replace(
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

        // example
        // app.get('/some/path', function (req, res) {
        //   res.json({
        //     aaa: "aaa",
        //     // server: server,
        //     // compiler: compiler,
        //     // app: app,
        //   })
        // })

        afterStaticApp.use((req, res) => {
          return res.status(404).end()
        })

        middlewares.unshift(beforeStaticApp)
        middlewares.push(afterStaticApp)
        return middlewares
      },
    },
  }
}
