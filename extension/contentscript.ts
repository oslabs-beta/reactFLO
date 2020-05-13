// Test code
const injectedStuff = document.createElement('h1');
injectedStuff.innerText = 'Ya got hacked nerd!';
document.body.appendChild(injectedStuff);

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

// Function will attach script to the dom 
const injectScript =  (file, tag) => {
  const htmlBody = document.getElementsByTagName(tag)[0];
  const script = document.createElement('script');
  script.setAttribute('type', 'text/javascript');
  script.setAttribute('src', file);
  htmlBody.appendChild(script); 
}

// Listening for message from injected script - inject.js
window.addEventListener('message', e => {

  // Making sure the event listened too is from the window 
  if (e.data.id === 'ReactFLO' && e.source === window) {
    // console.log('backend data from contentscripts: ', e.data);
    sendMessage(e.data);
  }
});

// Injects the script into the dom
injectScript(chrome.runtime.getURL('/inject.js'), 'body');

// Test message:
// sendMessage({ message: 'Hello from Content Scripts' });