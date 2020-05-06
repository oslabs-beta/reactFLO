const root = document.getElementById('root');
const message = document.createElement('h1');
message.innerText = 'Hello from index.ts';
root.appendChild(message);

let backgroundPageConnection = chrome.runtime.connect({
  name: "panel"
});

backgroundPageConnection.onMessage.addListener((msg) => {
  
  const newMessage = document.createElement('h2');
  newMessage.innerText = msg.message;
  root.appendChild(newMessage);
});

backgroundPageConnection.postMessage({
  name: 'init',
  tabId: chrome.devtools.inspectedWindow.tabId,
});
