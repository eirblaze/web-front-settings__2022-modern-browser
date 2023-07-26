import {describe,expect,it,beforeEach,afterEach} from "@jest/globals"
import "@wp/main/jq/math.mjs"

beforeEach(()=>{
  fetchMock.resetMocks()
})
afterEach(()=>{
  // fetchMock.mockRestore()
})

describe("jq math", () => {
  it("正常系", () => {
    expect($(document).addNum(1,2)).toEqual(3)
    expect($(document).addNum(-3,4.5)).toEqual(1.5)
  })
})
