import { makeUrl } from "@wp/main/example/makeUrl"

it("make Url", () => {
  const rootUrl = "https://example.com/"
  return expect(makeUrl("aaa")).toEqual(rootUrl + "aaa/")
})
