import { hideNoJs } from "@wp/main/example/hideNoJs"
import { makeUrl } from "@wp/main/example/makeUrl"

export function main(): void {
  hideNoJs()
  console.log("makeUrl", makeUrl("/aa/abcdefghi"))
}
