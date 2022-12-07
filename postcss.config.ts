// import merge from "webpack-merge"

import autoprefixer from "autoprefixer"
import normalizeCharset from "postcss-normalize-charset"
import cssnano from "cssnano"
import { isDev as _isDev } from "#tsk/getEnv"

export function plugins(isDev:boolean = _isDev){
  const retPlugins: any = []

  retPlugins.push(
    autoprefixer()
  )

  retPlugins.push(
    normalizeCharset()
  )

  if (!isDev) retPlugins.push(
    cssnano({
      preset: 'default',
    })
  )

  return retPlugins
}
