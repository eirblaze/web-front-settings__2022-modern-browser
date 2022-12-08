import { hideNoJs } from "@wp/main/example/hideNoJs"
import { makeUrl } from "@wp/main/example/makeUrl"
import Vue from 'vue/dist/vue.runtime.esm-browser'

console.log("webpack main")
hideNoJs()
console.log("makeUrl", makeUrl("/aa/abcdefghi"))

// 型推論を有効にする
const Component = Vue.extend({
  el: '#app-contents-index-menu',
  render: (createElement) => createElement(VueTopIndex),
  components: { VueTopIndex }
})

