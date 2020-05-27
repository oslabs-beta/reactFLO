const { fiberNodeToTree } = require('../algorithms/dataConversion');

declare global {
  interface Window {
    __REACT_DEVTOOLS_GLOBAL_HOOK__: any;
  }
}

const devTools = window.__REACT_DEVTOOLS_GLOBAL_HOOK__;
const reactInstance = window.__REACT_DEVTOOLS_GLOBAL_HOOK__.renderers;
const instance = reactInstance.get(1);

let payload: object | null = null;
let ready: boolean = true;
const time: number = 250;

const throttle = (fiberNode) => {
  payload = fiberNode;
  if (ready) send(fiberNode);
};

const send = (message) => {
  window.postMessage({ message: fiberNodeToTree(message), id: 'ReactFLO' }, '*');
  payload = null;
  ready = false;
  load();
};

const load = () => {
  setTimeout(()=>{
    ready = true;
    if (payload) send(payload);
  }, time);
};

export const initialHook = () => {
  if (instance && instance.version) {
    devTools.onCommitFiberRoot = (function (original) {
      return function (...args) {
        const fiberNode = args[1].current;
        throttle(fiberNode);
        return original(...args);
      };
    })(devTools.onCommitFiberRoot);
  } else {
    window.postMessage({ message: 'notSupported', id: 'ReactFLO' }, '*');
  }
};