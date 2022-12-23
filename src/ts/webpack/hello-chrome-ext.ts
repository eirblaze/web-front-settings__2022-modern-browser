document.addEventListener("DOMContentLoaded", () => {
  const jqvEle = document.createElement("p")
  jqvEle.textContent = "hello-js"
  document.getElementById("jqv")?.appendChild(jqvEle)
})
