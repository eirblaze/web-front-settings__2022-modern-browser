import type { Config } from "@jest/types"
import { defaults } from "jest-config"
import merge from "webpack-merge"

// env
import { jestAlias } from "./tasks/getTsCfg"

// Sync object
const configs: Config.InitialOptions[] = [defaults]

// ts-jest
configs.push({
  preset: 'ts-jest',
  testEnvironment: 'node',
})

// TypeScript
configs.push({
  moduleFileExtensions: ["ts", "tsx"],
})

configs.push({
  moduleNameMapper: jestAlias(__dirname),
})

console.log("jest merged cfg", merge(configs))
export default merge(configs)

// Or async function
// export default async (): Promise<Config.InitialOptions> => {
//   return {
//     verbose: true,
//   };
// };
