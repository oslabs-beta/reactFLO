// Collection of dev tool instances
const connections = {};

// Listening for an initial connection from index.ts
chrome.runtime.onConnect.addListener(port => {

  // Listens for an initial message
  const devToolsListener = (message, port) => {
    // Creates a connection to a devtool instance upon recieving message with name, 'init'
    if (message.name === 'init' && message.tabId){
      // Adds devtool connection to connections object at key of 'tabId'
      connections[message.tabId] = port;
      // Inject script to window
      console.log('Tab Id: ', message.tabId);
      chrome.tabs.executeScript(message.tabId, {
        code: `
          // Function will attach script to the dom 
          const injectScript = (file, tag) => {
            const htmlBody = document.getElementsByTagName(tag)[0];
            const script = document.createElement('script');
            script.setAttribute('type', 'text/javascript');
            script.setAttribute('src', file);
            htmlBody.appendChild(script);
          };
          injectScript(chrome.runtime.getURL('/inject.js'), 'body');
        `,
      });
      return;
    }
  }
  
  // Begins listening
  port.onMessage.addListener(devToolsListener);

  // Ends listening
  port.onDisconnect.addListener((port) => {
    port.onMessage.removeListener(devToolsListener);
    
    // Removes reference to devtool instance when the devtool is closed
    for (const prop in connections){
      if (connections[prop] === port){
        delete connections[prop];
        break;
      }
    }
  
  });
});

// Listening for message from content scripts
chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse){
  if (sender.tab){

    // Grabs tab id from content script and converts it to a string
    let tabId = `${sender.tab.id}`;

    // Check if tabId corresponds to a devtool instance
    if (tabId in connections){
      // Send message to corresponding devtool instance
      connections[tabId].postMessage(msg);
    } else {
      // Tells content script that connection was not made
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

