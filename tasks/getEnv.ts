import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

const argv = yargs(hideBin(process.argv)).argv
const env = argv["env"] || "dev"
export const isDev = env != "production" && env != "prod" && env != "analyze"
export const analyze = env == "analyze"
