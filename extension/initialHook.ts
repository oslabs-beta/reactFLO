// dec variables to hold react global hook 
const devTools = window.__REACT_DEVTOOLS_GLOBAL_HOOK__;
console.log('devTools: ', devTools)
const reactInstance = window.__REACT_DEVTOOLS_GLOBAL_HOOK__.renderers;
console.log('reactInstance: ', reactInstance)
const instance = reactInstance.get(1);
console.log('instance:', instance);
console.log('testing');

const initialHook = () => {

  if(instance && instance.version){
    let test;
    devTools.onCommitFiberRoot = (function (original) {
      return function (...args) {
        test = args[1].current;
        console.log('DOM: ', test);
        return original(...args);
      };
    })(devTools.onCommitFiberRoot);
    } else if (instance && instance.Reconciler) {
    instance.Reconciler.receiveComponent = (function (original) {
      return function (...args) {
          setTimeout(() => {
            console.log(instance.reconciler);
          }, 10);
        return original(...args);
      };
    })(instance.Reconciler.receiveComponent); 
  }
}

export default initialHook;