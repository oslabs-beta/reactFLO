const { fiberNodeToTree } = require('../algorithms/dataConversion');
const circle = require('circular');

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
    devTools.onCommitFiberRoot = (function (original) {
      return function (...args) {
        const fiberNode = args[1].current;
        const message = JSON.parse(JSON.stringify(fiberNodeToTree(fiberNode), circle()));
        window.postMessage({ message, id: 'ReactFLO' }, '*');

        return original(...args);
      };
    })(devTools.onCommitFiberRoot);
  }
};