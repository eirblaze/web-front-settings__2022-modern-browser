import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

const argv = yargs(hideBin(process.argv)).argv
export const analyze = "analyze" in argv
export const isDev = process.env.NODE_ENV != "production" && !analyze
