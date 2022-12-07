import { Configuration as WpCfgNeutral } from "webpack";
import { Configuration as WpDevServerCfg } from "webpack-dev-server";

interface WpCfg extends WpCfgNeutral {
  devServer?: WpDevServerCfg;
}

export const wpCfg: WpCfg = {
  devServer: {
    // index: "", // specify to enable root proxying
    proxy: [
      {
        // firebase
        context: ["/__"],
        target: "http://localhost:5000",
      },
      // {
      //   // WP 試作
      //   context: ["/wp-content"],
      //   target: "http://localhost:8090",
      //   pathRewrite: {
      //     "^/wp-content": "/qswp-docker/public/wp-content",
      //   },
      // },
    ],
  },
}
