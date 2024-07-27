class Node{
    constructor(value){
        this.value = value
        this.leftChild = null
        this.rightChild = null
    }
}
class BinaryTree{
    constructor(values){
        this.root = this.buildTree(values)
    }
}