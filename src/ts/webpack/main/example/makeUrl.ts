export function makeUrl(path: string): string {
  const rootUrl = "https://example.jp/"
  return rootUrl + path.replace(/\/?(.+)\/?/i, "$1/")
}
