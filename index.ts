const root = document.getElementById('root');
const message = document.createElement('h1');
message.innerText = 'Hello from index.ts';
root.appendChild(message);

let backgroundPageConnection = chrome.runtime.connect({
  name: "panel"
});

backgroundPageConnection.onMessage.addListener(function(message){
});

backgroundPageConnection.postMessage({
  name: 'init',
  tabId: chrome.devtools.inspectedWindow.tabId,
});
