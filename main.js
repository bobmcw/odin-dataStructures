const LinkedList = require('./linkedList.js')
const LinkedList = require('./binaryTreeTraversal.js')
myList = new LinkedList();
myList.append("cat");
myList.append("dog");
myList.append("cow");
myList.prepend("horse");
myList.toString();
console.log(myList.getHead());
console.log(myList.getTail());
console.log(myList.getSize());
console.log(myList.getAtIndex(2));
myList.pop();
myList.toString();
console.log(myList.contains("dog"));
console.log(myList.contains("siema"));
console.log(myList.find("dog"));
myList.insertAt(1, "turtle");
myList.toString();
myList.removeAt(3)
myList.toString()
console.log(myList.toArray())

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
// myTree.levelOrder((element) =>{
//     console.log(`element: ${element.value}`)
// })
// myTree.inOrder((element)=>{
//     console.log(element.value)
// })
myTree.postOrder((element)=>{
    console.log(element.value)
})
console.log(myTree.isBalanced())
myTree.insert(100);
myTree.insert(101);
myTree.insert(201);
prettyPrint(myTree.root)
console.log(myTree.isBalanced())
console.log(myTree.height(7))
myTree.rebalance()
prettyPrint(myTree.root)
console.log(myTree.isBalanced())