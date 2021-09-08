import { FactorNode } from "./factor-node";

export class FactorTreeHelper {

  root: FactorNode;
  smallest: number;

  run(number: number): number {
    this.smallest = null;
    this.root = null;
    this.root = this.createFactorTree(number);
    this.printLevelOrder(this.root);
    return this.smallest;
  }
  private newNode(key: number): FactorNode {
    const node = new FactorNode();
    node.left = null;
    node.right = null;
    node.key = key;
    return node;
  }
  private createFactorTree(key: number): FactorNode {
    const node = this.newNode(key);

    for (let i = 2; i < key / 2; i++) {
      if (key % i !== 0) continue;
      node.left = this.createFactorTree(i);
      node.right = this.createFactorTree(key / i);
      return node;
    }

    return node;
  }
  private printLevelOrder(root: FactorNode): void {
    if (root == null) return;
    const queue: FactorNode[] = [];
    queue.push(root);
    let str = "";
    while (queue.length !== 0) {
      const node = queue[0];
      str += node.key + " ";
      this.setSmallest(node.key);
      queue.shift();
      if (node.left != null) queue.push(node.left);
      if (node.right != null) queue.push(node.right);
    }
    console.log(str);
  }
  private setSmallest(key: number): void {
    if (this.smallest === null || this.smallest > key) this.smallest = key;
  }
}
