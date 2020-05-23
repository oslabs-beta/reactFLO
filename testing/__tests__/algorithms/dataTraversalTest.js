const { nodes, nodeToRoot } = require("../../mockData");
const { Traverse } = require('../../../extension/algorithms/dataTraversal');
const { connectToParent } = require("../../../extension/algorithms/dataConversion");

describe('Traversal', ()=>{
  
  let root;
  let array;
  const callback = function(node, stop){
    array.push(node.id);
    if(node.id === stop){
      return true;
    }
  }

  beforeAll(()=>{
    root = nodeToRoot(nodes);
    connectToParent(root);
  });

  beforeEach(() => {
    array = [];
  });

  describe('Traverse upward', ()=>{
    it('Should run a callback on each node from the starting node to the root node', () => {
      Traverse.upward(nodes[6], callback);
      expect(array).toEqual([6,5,4,3,2,1,0]);
    });
    it('Should not run the callback on any sibling or child node', () => {
      Traverse.upward(nodes[9], callback);
      expect(array).toEqual([9,8,3,2,1,0]);
    });
    it('Should end if the callback returns true', () => {
      Traverse.upward(nodes[9], callback, 8);
      expect(array).toEqual([9,8]);
    });
  });

  describe('Traverse downward', ()=>{
    it('Should run a callback on every child node under a target node', ()=>{
      Traverse.downward(nodes[0], callback);
      expect(array).toEqual([1,2,3,4,5,6,7,8,9]);
    });
    it('Should not run the callback on parent nodes', () => {
      Traverse.downward(nodes[3], callback);
      expect(array).toEqual([4,5,6,7,8,9]);
    });
    it('Should not run the callback on sibling nodes', () => {
      Traverse.downward(nodes[4], callback);
      expect(array).toEqual([5,6,7]);
    });
    it('Should end if the evaluated result is true', () => {
      Traverse.downward(nodes[0], callback, 8);
      expect(array).toEqual([1,2,3,4,5,6,7,8]);
    });
  });
});