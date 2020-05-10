const root = document.getElementById('root');
const message = document.createElement('h1');
root.appendChild(message);

// Creates a connection to the background script
let backgroundPageConnection = chrome.runtime.connect({
  name: "panel"
});

// Sends a message to the background script that initializes a connection to the dev tool page
backgroundPageConnection.postMessage({
  name: 'init',
  tabId: chrome.devtools.inspectedWindow.tabId,
});

// Listens for a message from background script
backgroundPageConnection.onMessage.addListener((msg) => {
  // Test code: Renders messages from the background script to the dom
  const newMessage = document.createElement('h2');
  newMessage.innerText = msg.message;
  root.appendChild(newMessage);
});