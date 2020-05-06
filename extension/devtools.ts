chrome.devtools.panels.create(
  'ReactFlo',
  null,
  'panel.html',
  // Not including function (watch trailing comma for errors)
);

let backgroundPageConnection = chrome.runtime.connect({
  name: "panel"
});

backgroundPageConnection.onMessage.addListener(function(message){
});

backgroundPageConnection.postMessage({
  name: 'init',
  tabId: chrome.devtools.inspectedWindow.tabId,
});
