import { describe, expect, it, beforeEach, afterEach } from "@jest/globals"
import { errorToMsg } from "#root/tasks/jest-cfg/util.test"

describe("ブラウザ機能のモックそのものをテスト", () => {
  interface FetchTestReturn {
    errorMsg?: string
    resText?: string
  }
  async function fetchTest():Promise<FetchTestReturn> {
    return await (async()=>{
      try {
        const res = await fetch("https://example.com/")
        const data = await res.text()
        return {
          resText: data
        }
      } catch(e) {
        return {
          errorMsg: errorToMsg(e)
        }
      }
    })()
  }
  it("fetch res", async () => {
    const mockedDefaultResponse = "mocked Default Response"
    fetchMock.mockResponseOnce(mockedDefaultResponse)
    const data = await fetchTest()
    expect(data?.resText).toBe(mockedDefaultResponse)
    expect(data?.errorMsg).toBeUndefined()
  })
  it("fetch error", async () => {
    const mockedDefaultResponse = "mocked Default Response"
    fetchMock.mockRejectOnce(Error(mockedDefaultResponse))
    const data = await fetchTest()
    expect(data?.resText).toBeUndefined()
    expect(data?.errorMsg).toBe(mockedDefaultResponse)
  })

  it("sessionStorage", () => {
    // sessionStorage にデータを保存
    sessionStorage.setItem("name", "Alice")
    // sessionStorageからデータを取得
    const name = sessionStorage.getItem("name")
    // 取得したデータが保存したデータと一致することを確認
    expect(name).toBe("Alice")
  })

  // window.location
  it("window.location", () => {
    // href is mocked
    expect(window.location.href).toBe("https://example.com")
    // pathname is mocked"
    expect(window.location.pathname).toBe("/test")
    // search is mocked"
    expect(window.location.search).toBe("?foo=bar")
  })
})
