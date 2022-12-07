import { Configuration as WpCfgNeutral } from "webpack";
import { Configuration as WpDevServerCfg } from "webpack-dev-server";
import { webpackDevServerPugView } from "#root/ioinfo"
// import superstatic from "superstatic"
// import firebaseCfgGetter from 'firebase-tools/lib/config'

interface WpCfg extends WpCfgNeutral {
  devServer?: WpDevServerCfg;
}

// const firebaseCfg = firebaseCfgGetter.load({ cwd: process.cwd() })

export default function (projectRoot: string): WpCfg {
  return {
    devServer: {
      before: (app) => {
        app.set("views", webpackDevServerPugView.indexPath)
        app.set("view engine", "pug")

        // firebase共存設定
        // app.use(superstatic({ config: firebaseCfg.data.hosting }))

        app.get("/", function (req, res) {
          res.render("index", {
            title: "Express.js index",
            projectRoot: projectRoot,
          })
        })

        // example
        // app.get('/some/path', function (req, res) {
        //   res.json({
        //     aaa: "aaa",
        //     // server: server.,
        //     // compiler: compiler,
        //     // app: app,
        //   })
        // })
      },
    },
  }
}
