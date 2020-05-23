const { nodes, nodeToRoot } = require("../../mockData");
const { connectToParent } = require("../../../extension/algorithms/dataConversion");
const { FindProp, createPathToRoot, workOnStatefulNodes } = require('../../../extension/algorithms/nodeCategorization')

describe('Node categorization ', ()=>{
  
  let root;
  
  beforeAll(()=>{
    root = nodeToRoot(nodes);
    connectToParent(root);
  });
  
  describe('Find Prop in State', ()=>{
    
    beforeEach(() => {
      nodes[1].displayWeight = 0;
      nodes[2].displayWeight = 0;
      nodes[4].displayWeight = 0;
    });

    describe('Top level values', ()=> {
      it('Should set displayWeight to 1 if top level primitive value matches prop', ()=> {
        FindProp.inState(nodes[1], {value:'Hello'});
        expect(nodes[1].displayWeight).toEqual(1);
      });
      it('Should set displayWeight to 1 if the top level is an Object and has a value equal to props', ()=> {
        FindProp.inState(nodes[2], {
          value: {obj: {
          nestedKey: "hello there",
          arr: [1,2,3],
        }}});
        
        expect(nodes[2].displayWeight).toEqual(1);
      });
      it('Should set displayWeight to 1 if the top level is an Array and has a value equal to props', ()=> {
        FindProp.inState(nodes[4], { value: [
          true,
          { bool: false },
        ]});
        expect(nodes[4].displayWeight).toEqual(1);
      });
    });
    describe('Nested keys', ()=> {
      it('Should set displayWeight to 0.5 if a key in a nested object is equal to props', ()=> {
        FindProp.inState(nodes[2], {value: 'nestedKey'});
        expect(nodes[2].displayWeight).toEqual(0.5);
      });
    });
  });

  describe('Find Prop in Props', ()=>{
    it('if target has no props the display weight should remain unchanged', ()=>{
      let initialDisplayWeight = nodes[5].displayWeight
      FindProp.inProps(nodes[5],{key: 'no boi', value: 'yeah boi'})
      expect(nodes[5].displayWeight).toEqual(initialDisplayWeight)
    });
    it('Should set display weight to 0.5 if the target node has a prop with the same key but a different value', ()=>{
      FindProp.inProps(nodes[9], {key: 'key', value: 'wrong value'});
      expect(nodes[9].displayWeight).toEqual(0.5);
    });
    it('Should set display weight to 1 if the target node has a prop with the same key and value',()=>{
      FindProp.inProps(nodes[9], {key: 'key', value: 'value'})
      expect(nodes[9].displayWeight).toEqual(1);
    });
  });

  describe('Create Path to Root', ()=>{
    let array;
    it('Should return an array of nodes', ()=>{
      array = createPathToRoot(nodes[7]);
      expect(array.length).toEqual(3)
    });
    it('All elements in the array should be stateful', ()=>{
      array = createPathToRoot(nodes[7]);
      expect(!!array[0].state).toEqual(true);
      expect(!!array[1].state).toEqual(true);
      expect(!!array[2].state).toEqual(true);
    });
    it('The first stateful nodes mediums array should contain the starting node as its first element', ()=> {
      array = createPathToRoot(nodes[7]);
      expect(array[0].mediums[0]).toEqual(nodes[7]);
    });
    it('Each subsequent stateful node\'s mediums array should contain the previous stateful as its first element', ()=> {
      array = createPathToRoot(nodes[7]);
      expect(array[1].mediums[0]).toEqual(nodes[4]);
      expect(array[2].mediums[0]).toEqual(nodes[2]);
    });
    it('Each mediums array should contain all of the non stateful nodes between its state node and the node at its first element', ()=>{
      array = createPathToRoot(nodes[7]);
      expect(array[0].mediums).toEqual([nodes[7],nodes[6],nodes[5]]);
      expect(array[1].mediums).toEqual([nodes[4],nodes[3]]);
      expect(array[2].mediums).toEqual([nodes[2]]);
    });
  });
});