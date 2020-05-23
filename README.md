<img src='/assets/reactb.png'>

### What is ReactFLO
ReactFLO is a visualization tool for React developers that allows users to view a visual representation of an application's component heirarchy as well as the flow of state through the application.

Wether you are onboarding a new codebase or looking to expand you site, ReactFLO can can help you and your team make sense of the way data is being passed through an application and empower you to make informed decisions about the structure of you components

### Getting Started
1. Install ReactFLO from the [Chrome Web Store](https://developer.chrome.com/webstore/publish)
2. Make sure that the [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en) are also installed and active
3. Open a webpage that utilizes React (currently works best on pages being hosted locally)
4. Open the Chrome DevTools (cmd + option + i or ctrl + shift + j) and navigate to the ReactFLO panel
6. Perform an action on the webpage that causes state to update (if the page does not perform such an action automatically)

### How to Use
* Click and drag to pan
* Scroll up to zoom in and scroll down to zoom out
* Double click nodes to collapse/expand their child nodes
* Click on a node to view its props and state
* Select a prop to visualize its path as it flows throught the component tree
  * Stateful nodes will turn green if they contain a value equal to the value of the selected prop
  * Stateful nodes will turn yellow if they contain a key with a value equal to the value of the selected prop
  * Sibling nodes will turn yellow if they contain a prop with the same key but a different value to the selected prop
  * Sibling nodes will turn green if they contain a prop with the same key and value as the selected prop

### Making Changes
If you are interested in altering or expanding the functionality of ReactFLO you can access the source code and build out your own versoion of the application by following these steps:
1. Clone this repository
1. Run `npm i` in your terminal to install dependencies
1. Make your changes
1. Run `npm run build` to build out the application (note: [watch](https://webpack.js.org/configuration/watch/) is active)
1. In Chrome, navigate to your [extensions](chrome://extensions/)
1. Make sure that developer mode is toggled on (found in the top right corner)
1. Click on the button labled: `Load unpacked`
1. Select the folder: `~/ReactFLO/build`
1. Make sure to refresh the ReactFLO extension every time you make changes to the files

### Testing
Run `npm test` in the terminal. This will initialize the testing suite. Jest is used to run unit tests on the internal library and Enzyme is used alongside Jest to run integration testing on the front end code.

### Authors
Cherie Zhong

Jordan Deleon

Marcus Valverde

Vaughn Hartling
