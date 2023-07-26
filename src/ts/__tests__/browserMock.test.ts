import { describe, expect, it, beforeEach, afterEach } from "@jest/globals"

describe("ブラウザ機能のモックそのものをテスト", () => {
  it("fetch", async () => {
    const mockedDefaultResponse = "mocked Default Response"
    fetchMock.mockResponse(mockedDefaultResponse)
    const data = await (async()=>{
      const res = await fetch("https://example.com/")
      return await res.text()
    })()
    expect(data).toBe(mockedDefaultResponse)
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
