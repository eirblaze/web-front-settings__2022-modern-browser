import {describe,expect,it,beforeEach,afterEach} from "@jest/globals"
import { makeUrl } from "@wp/main/example/makeUrl"

describe("make Url", () => {
  it("正常系", () => {
    const rootUrl = "https://example.com/"
    expect(makeUrl("aaa")).toEqual(rootUrl + "aaa/")
  })
})
