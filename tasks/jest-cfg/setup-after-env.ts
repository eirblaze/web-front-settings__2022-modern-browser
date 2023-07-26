import { beforeEach, afterEach } from "@jest/globals"
// jestでsessionstorageをモックにする方法は？
// 以下のコードは、sessionStorageのgetItemとsetItemをモックにする例です。
// テストファイルの先頭に以下のコードを記述します。

// sessionStorageのモックを作成
const mockSessionStorage = {
  data: {},
  getItem(key) {
    return this.data[key] || null
  },
  setItem(key, value) {
    this.data[key] = value
  },
  removeItem(key) {
    this.data[key] = null
  },
  clear() {
    this.data = {}
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
