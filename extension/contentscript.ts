const injectedStuff = document.createElement('h1');
injectedStuff.innerText = 'Ya got hacked nerd!';
document.body.appendChild(injectedStuff);

const sendMessage = () => {
  chrome.runtime.sendMessage({
    message: "hello from content scripts, nerd!!!!"
  }, (response) => {
    // If connection to dev page has not been established, wait and retry
    if (response.error) {
      console.log(response);
      setTimeout(sendMessage, 5000);
    }
  });
}

