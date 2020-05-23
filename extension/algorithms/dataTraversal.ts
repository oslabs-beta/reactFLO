import { DisplayNode } from "../backend/interfaces";

 class Traverse {

  static upward(targetNode: DisplayNode | null, callback: Function, ...args: any): void {
    while(targetNode) {
      const result = callback(targetNode, ...args);
      if (result) return;
      targetNode = targetNode.parent;
    }
  }

  static downward(startNode: DisplayNode, callback: Function, ...args: any): void {
    for (const childNode of startNode.children) {
      const result = callback(childNode, ...args);
      if (result) return;
      this.downward(childNode, callback, ...args);
    }
  }
  
}

module.exports = { Traverse };