import { State, DisplayNode } from './interfaces';
const { fiberNodeToTree } = require('../algorithms/dataConversion');
const circle = require('circular');

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
        console.log('Con2: ', fiberNodeToTree(test));
        // const targetNode = extractData(test).children[0].children[0].children[1].children[0].children[1];
        // console.log('Tar: ', targetNode);
        const message = JSON.parse(JSON.stringify(fiberNodeToTree(test), circle()));
        window.postMessage({ message, id: 'ReactFLO' }, '*');

        // const stateTest = extractData(test);
        // assignChildren(stateTest);
        // console.log('state', stateTest);
        // const stateTarget = stateTest.children[0].children[0].children[1].children[0].children[1]
        // console.log('Top Node: ', findHighestState(stateTarget, stateTarget.props[1], (node: DisplayNode, prop: State) => {
        //   console.log(stateTarget)
        //   matchState(node, prop);
        //   console.log('Stateful Node: ', node);
        //   console.log(prop.value);
        // }));
        // traverseData(targetNode, targetNode.props[0], (node, prop)=> console.log('node: ', node))
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