const injectedStuff = document.createElement('h1');
injectedStuff.innerText = 'Ya got hacked nerd!';
document.body.appendChild(injectedStuff);

const sendMessage = (message) => {
  chrome.runtime.sendMessage(message, (response) => {
    // If connection to dev page has not been established, wait and retry
    if (response.error) {
      console.log(response);
      setTimeout(() => sendMessage(message), 5000);
    }
  });
}

const injectScript =  (file, tag) => {
  const htmlBody = document.getElementsByTagName(tag)[0];
  const script = document.createElement('script');
  script.setAttribute('type', 'text/javascript');
  script.setAttribute('src', file);
  htmlBody.appendChild(script); 
}

window.addEventListener('message', e => {
  console.log('window event listener e: ', e);
  if (e.source === window) sendMessage(e.data);
});

setTimeout(()=>{
  injectScript(chrome.runtime.getURL('/inject.js'), 'body')
}, 5000);

setTimeout(() => sendMessage({ message: 'Hello from Content Scripts' }), 20000);
