import { DisplayNode } from "../backend/interfaces";

export default class Traverse {

  static downward(startNode: DisplayNode, callback: Function, ...args: any): void {
    for (const childNode of startNode.children) {
      const result = callback(childNode, ...args);
      if (result) return;
      this.downward(childNode, callback, ...args);
    }
  }
  
}