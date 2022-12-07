import { argv } from "yargs"

const env = argv.env || "dev"
export const isDev = env != "production" && env != "prod" && env != "analyze"
export const analyze = env == "analyze"
