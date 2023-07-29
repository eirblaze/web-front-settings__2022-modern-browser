import { beforeEach, afterEach } from "@jest/globals"
// jestでsessionstorageをモックにする方法は？
// 以下のコードは、sessionStorageのgetItemとsetItemをモックにする例です。
// テストファイルの先頭に以下のコードを記述します。

// sessionStorageのモックを作成
const mockSessionStorage = {
  data: new Map<string,string>(),
  getItem(key: string) {
    return this.data.get(key) || null
  },
  setItem(key: string, value: string) {
    this.data.set(key,value)
  },
  removeItem(key: string) {
    this.data.delete(key)
  },
  clear() {
    this.data.clear()
  },
}

// モックにするプロパティ
const mockLocation = {
  href: "https://example.com",
  pathname: "/test",
  search: "?foo=bar",
}

beforeEach(() => {
  fetchMock.resetMocks()

  // sessionStorage のモックをグローバルオブジェクトに代入
  Object.defineProperty(window, "sessionStorage", {
    value: mockSessionStorage,
  })

  // window.location のモックをグローバルオブジェクトに代入
  Object.defineProperty(window, "location", { writable: true, value: mockLocation})

})

afterEach(() => {
  fetchMock.mockRestore()
  jest.restoreAllMocks()
})
