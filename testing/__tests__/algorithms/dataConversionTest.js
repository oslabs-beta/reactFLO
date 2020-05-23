const { nodes, nodeToRoot} = require("../../mockData");
const { connectToParent } = require("../../../extension/algorithms/dataConversion");

describe('Data conversion testing',()=>{

  let root;

  beforeAll(()=>{
    root = nodeToRoot(nodes);
    connectToParent(root);
  });
  
  describe('Connect to parent', ()=>{
    it('Root node should not have a parent', () => {
      expect(root.parent).toEqual(null);
    });
    it('Each node\'s children should have a reference to that node', () => {
      nodes.forEach((node) => {
        node.children.forEach((child) => {
          expect(child.parent.id).toEqual(node.id);
        });
      });
    });
  });
  
});