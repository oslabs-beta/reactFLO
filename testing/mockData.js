function objCreator (id, state=null, props=null){
  return {
    id,
    state,
    props,
    children: [],
    parent: null,
    mediums: [],
    displayWeight: 0,
  }
}

const nodes = [
  objCreator(0, null, null),
  objCreator(1, {
    value: {string: 'Hello'}
  }, null),
  objCreator(2, {
    value: {obj: {
    nestedKey: "hello there",
    arr: [1,2,3],
  }}}, null),
  objCreator(3, null, null),
  objCreator(4, {
    value: {arr: [
    true,
    { bool: false },
  ]}}, null),
  objCreator(5, null, null),
  objCreator(6, null, null),
  objCreator(7, null, null),
  objCreator(8, null, null),
  objCreator(9, null, null),
];

function nodeToRoot(array){
  array[0].children.push(array[1]);
  array[1].children.push(array[2]);
  array[2].children.push(array[3]);
  array[3].children.push(array[4], array[8]);
  array[4].children.push(array[5]);
  array[5].children.push(array[6]);
  array[6].children.push(array[7]);
  array[8].children.push(array[9]);

  return array[0];
}
module.exports = { nodes, nodeToRoot };