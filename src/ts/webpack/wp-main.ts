import { hideNoJs } from "@wp/main/example/hideNoJs"
import { makeUrl } from "@wp/main/example/makeUrl"

console.log("webpack main")
hideNoJs()
console.log("makeUrl", makeUrl("/aa/abcdefghi"))
