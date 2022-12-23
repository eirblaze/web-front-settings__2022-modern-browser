/**
 * ページ上でコンテストメニューを表示した時に発生するイベント
 */
let clickedTxt: string
document.addEventListener("contextmenu", function(event: MouseEvent){
  // イベント発生時の要素を保存
  clickedTxt = (event.currentTarget as HTMLElement)?.outerText || "none"
}, true);

/**
* Background Scriptからのメッセージを受け取るためのリスナー
*/
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  // 保存しておいた要素情報をレスポンスに設定して返却
  if(request == "getClickedTxt") {
      sendResponse({value: clickedTxt});
  }
});
