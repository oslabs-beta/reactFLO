// Collection of dev tool instances
const connections = {};

// Listening for an initial connection from index.ts
chrome.runtime.onConnect.addListener(port => {

  // Listens for an initial message
  const devToolsListener = (message, port) => {
    // Creates a connection to a devtool instance upon recieving message with name, 'init'
    console.log('background message: ', message);
    if (message.name === 'init' && message.tabId){
      // Adds devtool connection to connections object at key of 'tabId'
      connections[message.tabId] = port;
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
      console.log(msg);
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

