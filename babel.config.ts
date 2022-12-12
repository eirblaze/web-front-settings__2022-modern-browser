import merge from "webpack-merge"
import { isDev as _isDev } from "#tsk/getEnv"

export default function getBabelCfg(isDev: boolean = _isDev) {

  const babelCfg: any[] = []

  // loose の代わり
  // https://github.com/babel/rfcs/blob/master/rfcs/0003-top-level-assumptions.md
  babelCfg.push({
    assumptions: {
      ignoreToPrimitiveHint: true,
    }
  })

  // TS
  babelCfg.push({
    presets: [
      "@babel/typescript",
      ["react-app", { "flow": false, "typescript": true }],
    ],
  })

  // console.log("babel mergedOptions",merge(babelCfg))
  return merge(babelCfg)
}
