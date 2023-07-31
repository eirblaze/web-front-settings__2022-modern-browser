import { hideNoJs } from "@wp/main/example/hideNoJs"
// import { makeUrl } from "@wp/main/example/makeUrl"

console.log("webpack main")
hideNoJs()

window.addEventListener("DOMContentLoaded", async () => {

  const displayElm = document.getElementById("display")
  if (!displayElm) throw(Error("displayElm not found"))

  // dynamic import
  const makeUrl = await (async () => {
    try {
      return await import("@wp/main/example/makeUrl")
    } catch(e) {
      throw e
    }
  })()

  displayElm.innerText = `makeUrl: ${makeUrl.makeUrl("/aa/abcdefghi")}`
})

