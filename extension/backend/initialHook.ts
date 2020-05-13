import { extractData } from './dataCollection';
const circular = require('circular');

// dec variables to hold react global hook 
//declare const window: any;
declare global {
  interface Window {
    __REACT_DEVTOOLS_GLOBAL_HOOK__: any;
  }
}

const devTools = window.__REACT_DEVTOOLS_GLOBAL_HOOK__;
const reactInstance = window.__REACT_DEVTOOLS_GLOBAL_HOOK__.renderers;
const instance = reactInstance.get(1);


export const initialHook = () => {

  if (instance && instance.version) {
    let test;
    devTools.onCommitFiberRoot = (function (original) {
      return function (...args) {
        test = args[1].current;
        // for debugging
        console.log('DOM: ', test);
        console.log('Con: ', extractData(test));
        let obj = extractData(test);
        // obj = JSON.parse(JSON.stringify(obj, circular()));
        window.postMessage({ message: obj, id: 'ReactFLO' }, '*');
        return original(...args);
      };
    })(devTools.onCommitFiberRoot);
  }
  // else if (instance && instance.Reconciler) {
  //   instance.Reconciler.receiveComponent = (function (original) {
  //     return function (...args) {
  //       setTimeout(() => {
  //         console.log(instance.reconciler);
  //       }, 10);
  //       return original(...args);
  //     };
  //   })(instance.Reconciler.receiveComponent);
  // }
}

//export default initialHook;