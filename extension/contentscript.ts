// Function will send a message to the background script 
const sendMessage = (message) => {
  chrome.runtime.sendMessage(message, (response) => {
    // If connection to dev page has not been established, wait and retry
    if (response.error) {
      // console.log(response);
      // Waits five seconds between retrys
      setTimeout(() => sendMessage(message), 5000);
    }
  });
}

// Listening for message from injected script - inject.js
window.addEventListener('message', e => {
  // Making sure the event listened too is from the window 
  if (e.data.id === 'ReactFLO' && e.source === window) {
    // console.log('backend data from contentscripts: ', e.data);
    sendMessage(e.data);
  }
});
