import { hideNoJs } from "@wp/main/example/hideNoJs"
import { makeUrl } from "@wp/main/example/makeUrl"
import { createApp } from "vue"
import VueTopIndex from "@wp/vue/top.vue"

console.log("webpack main")
hideNoJs()
console.log("makeUrl", makeUrl("/aa/abcdefghi"))

// 型推論を有効にする
$(()=>{
  createApp(VueTopIndex).mount('#app-contents-index-menu')
})

