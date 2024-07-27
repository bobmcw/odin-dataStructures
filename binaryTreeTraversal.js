class Node{
    constructor(value){
        this.value = value
        this.leftChild = null
        this.rightChild = null
    }
}
class BinaryTree{
    constructor(values){
        this.root = this.buildTree(values,0,values.length -1)
    }
    buildTree(values,start,end){
        if(start>end){return null}
        const mid = Math.floor((start+end)/2)
        const root = new Node(values[mid])
        root.leftChild = this.buildTree(values,start,mid-1)
        root.rightChild = this.buildTree(values,mid+1,end)
        return root
    }
}
const myTree = new BinaryTree([1,2,3,4,5,6,7,8,9])

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
  prettyPrint(myTree.root)