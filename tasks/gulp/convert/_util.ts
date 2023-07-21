import { resolve as pathResolve } from "path"
import { type GulpCfg } from "#root/ioinfo"

export function srcArray(gulpCfg: GulpCfg) {
	const srcFilesWithRoot: string[] = []
	srcFilesWithRoot.push(
		...gulpCfg.src.files.map((srcStr) =>
			pathResolve(gulpCfg.src.baseDir, srcStr)
		)
	)
	srcFilesWithRoot.push(
		...gulpCfg.src.ignoreFiles.map(
			(srcStr) => `!${pathResolve(gulpCfg.src.baseDir, srcStr)}`
		)
	)
	return srcFilesWithRoot
}

function getSuffixStr(base: string, gulpCfg: GulpCfg) {
	if (!gulpCfg.dest.suffix) return ""
	if (
		!gulpCfg.dest.suffix.ignore ||
		base.match(gulpCfg.dest.suffix.ignore) === null
	)
		return gulpCfg.dest.suffix.str
	return ""
}

export function addSuffixStr(base: string, gulpCfg: GulpCfg) {
	return base.concat(getSuffixStr(base, gulpCfg))
}

export function delSuffixStr(base: string, gulpCfg: GulpCfg) {
	const suffixStr = getSuffixStr(base, gulpCfg)
	if (suffixStr) return base.replace(RegExp(suffixStr.concat("$")), "")
	return base
}
