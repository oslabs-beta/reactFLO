export const childOrSibling = (node) => {
  const memoizedState = node.memoizedState ? node.memoizedState.memoizedState : null;
  const infoObject = {
    id: node._debugID,
    type: node.type,
    memoizedState,
    memoizedProps: node.memoizedProps,
    tag: node.tag,
  };
  if (node.child) infoObject.child = childOrSibling(node.child);
  if (node.sibling) infoObject.sibling = childOrSibling(node.sibling);

  return infoObject;
}