import { initialHook } from './backend/initialHook';

// function messageToContentScript(message) {
//   window.postMessage(message, "*");
// };

// Note: Index will add any text in the 'message' property to the dev tool dom
// messageToContentScript({
//   message: "message from injection site!",
//   id: 'ReactFLO',
// });

// Feel free to remove when there is more code...
// console.log("hello from the injection site!");

// Get data from React dev tools
initialHook();