import { Configuration as WpCfgNeutral } from "webpack"
//@ts-ignore
import { Configuration as WpDevServerCfg } from "webpack-dev-server"
// import superstatic from "superstatic"
// import firebaseCfgGetter from 'firebase-tools/lib/config'
import express from "express"
import pugServer from "./pug"
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

        // pug
        beforeStaticApp.use(pugServer(projectRoot))

        // firebase共存設定
        // beforeStaticApp.use(superstatic({ config: firebaseCfg.data.hosting }))

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
