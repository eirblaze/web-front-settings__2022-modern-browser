import jQ from "jquery"
// @ts-ignore
globalThis.$ = globalThis.jQuery = jQ

// jest-fetch-mock
import { enableFetchMocks } from "jest-fetch-mock"
enableFetchMocks()
