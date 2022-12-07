import { parse } from "comment-json"
import fs from "fs"
import path from "path"
import moduleAlias from "module-alias"

export function all(projectRoot: string): any {
  return parse(
    fs.readFileSync(path.resolve(projectRoot, "tsconfig.json"), "utf-8")
  )
}

export function wpAlias(projectRoot: string): { [index: string]: string } {
  const retTsAlias = {}
  const all_ = all(projectRoot)
  if (all_.compilerOptions) {
    if (all_.compilerOptions.paths) {
      for (const key in all_.compilerOptions.paths) {
        if (
          Object.prototype.hasOwnProperty.call(all_.compilerOptions.paths, key)
        ) {
          retTsAlias[key.replace(/\/?\*/, "")] = path.resolve(
            projectRoot,
            (all_.compilerOptions.paths[key][0] || "").replace(/\/?\*/, "")
          )
        }
      }
    }
  }
  // console.log("wpAlias", retTsAlias)
  return retTsAlias
}

export function nodeModuleAlias(projectRoot: string): void {
  moduleAlias.addAliases(wpAlias(projectRoot))
}

export function jestAlias(projectRoot: string): { [index: string]: string } {
  const retTsAlias = {}
  const all_ = all(projectRoot)
  if (all_.compilerOptions) {
    if (all_.compilerOptions.paths) {
      for (const key in all_.compilerOptions.paths) {
        if (
          Object.prototype.hasOwnProperty.call(all_.compilerOptions.paths, key)
        ) {
          retTsAlias[key.replace(/\/?\*/, "/(.+)")] = path.resolve(
            projectRoot,
            (all_.compilerOptions.paths[key][0] || "").replace(/\/?\*/, "/$1")
          )
        }
      }
    }
  }
  return retTsAlias
}
