class Node {
  constructor(value) {
    this.value = value;
    this.leftChild = null;
    this.rightChild = null;
  }
}
class BinaryTree {
  constructor(values) {
    values.sort(function(a,b) {
        return a-b
    });
    console.log(values)
    this.root = this.buildTree(values, 0, values.length - 1);
  }
  buildTree(values, start, end) {
    if (start > end) {
      return null;
    }
    const mid = Math.floor((start + end) / 2);
    const root = new Node(values[mid]);
    root.leftChild = this.buildTree(values, start, mid - 1);
    root.rightChild = this.buildTree(values, mid + 1, end);
    return root;
  }
  insert(value) {
    function findWhereToInsert(node) {
      if (node.value > value) {
        if (node.leftChild === null) {
          node.leftChild = new Node(value);
          return;
        } else {
          findWhereToInsert(node.leftChild);
        }
      }
      if (node.value < value) {
        if (node.rightChild === null) {
          node.rightChild = new Node(value);
          return;
        } else {
          findWhereToInsert(node.rightChild);
        }
      }
    }
    findWhereToInsert(this.root);
  }
}
const myTree = new BinaryTree([45, 13, 5, 20, 7, 19, 9]);

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.rightChild !== null) {
    prettyPrint(node.rightChild, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
  if (node.leftChild !== null) {
    prettyPrint(node.leftChild, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};
myTree.insert(0);
myTree.insert(6);
prettyPrint(myTree.root);
