export function hideNoJs(): void {
  $(() => {
    console.log("start: hide no js")
    $(".no-js").hide()
  })
}
