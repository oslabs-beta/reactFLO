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
        console.log(nodes[2].displayWeight);
        FindProp.inState(nodes[2], {value: 'nestedKey'});
        expect(nodes[2].displayWeight).toEqual(0.5);
      });
    });
  });

  describe('Find Prop in Props', ()=>{

  });

  describe('Create Path to Root', ()=>{
    
  });

  describe('Work on Stateful Nodes', ()=>{
  
  });
});