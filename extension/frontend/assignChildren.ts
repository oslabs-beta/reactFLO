import {
  DisplayNode, State,
} from "../backend/interfaces";

export const assignChildren = (node: DisplayNode): void => {
  for (const child of node.children) {
    child.parent = node;
    assignChildren(child);
  }
};