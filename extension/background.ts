const connections = {};

chrome.runtime.onConnect.addListener(port => {

  const devToolsListener = (message, port) => {
    console.log('background message: ', message);

    if (message.name === 'init' && message.tabId){
      connections[message.tabId] = port;
      return;
    }
  }

  port.onMessage.addListener(devToolsListener);

  port.onDisconnect.addListener((port) => {
    port.onMessage.removeListener(devToolsListener);
    
    for (const prop in connections){
      if (connections[prop] === port){
        delete connections[prop];
        break;
      }
    }
  
  });
});

chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse){
  if (sender.tab){
    let tabId = `${sender.tab.id}`;

    if (tabId in connections){
      connections[tabId].postMessage(msg);
    } else {
      sendResponse({
        error: 'error',
      });
      console.log(`Tab, ${tabId}, not found in connection list: `, connections);
    }
  } else {
    console.log("sender.tab not defined.");
  }

  return true;
});

