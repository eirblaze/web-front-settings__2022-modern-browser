export function makeUrl(path: string): string {
  const rootUrl = "https://example.com/"
  return rootUrl + path.replace(/\/?(.+)\/?/i, "$1/")
}
