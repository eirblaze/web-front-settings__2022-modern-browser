{
  chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
      id: 'root',
      title: 'リンクテキスト取得'
    })
    chrome.contextMenus.create({
      id: 'child1',
      parentId: 'root',
      title: 'none'
    })
  })

  // メニューをクリック時に実行
  chrome.contextMenus.onClicked.addListener(item => {
    console.log(item)

    // Background Scirptからはコンテストメニュー表示元の要素を直接取得できないため、
    // Message通知機能を使って、Content Scirpt側にメッセージを送信する
    chrome.tabs.sendMessage(tabs[0].id, "getClickedTxt", function(response) {
      // Content Scirpt側で設定されたレスポンス（クリックされた要素）が
      // コールバック関数の引数でやってくる
      chrome.contextMenus.update("child1",{title: response.value})
    })

  })

}