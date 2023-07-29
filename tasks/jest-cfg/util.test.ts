import { describe, expect, it, beforeEach, afterEach } from "@jest/globals"

export const errorToMsg = (error: unknown) => {
  if (error instanceof Error) return error.message
  else if (typeof error === "string") return error
  return "unexpected error"
}

describe("test util",()=>{
  it("errorToMsg", ()=>{
    const errorStr = "error str"
    expect(errorToMsg(Error(errorStr))).toBe(errorStr)
    expect(errorToMsg(errorStr)).toBe(errorStr)
    expect(errorToMsg({a: "aaa"})).toBe("unexpected error")
  })
})
