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
  deleteItem(value){
    function del(node,previousNode=null){
        if(node === null){return}
        if(value === node.value){
            //case 1: no children
            if(node.leftChild === null && node.rightChild === null){
                if(previousNode.leftChild === node){
                    previousNode.leftChild = null
                }
                else{
                    previousNode.rightChild = null
                }
                return
            }
            //case2: one child
            else if(node.leftChild !== null && node.rightChild === null){
                node.value = node.leftChild.value
                if (node.leftChild.rightChild !== null){
                node.rightChild = node.leftChild.rightChild
                }
                else{
                    node.rightChild = null
                }
                if(node.leftChild.leftChild !== null){    
                node.leftChild = node.leftChild.leftChild
                }
                else{
                    node.leftChild = null
                }
                return
            }
            else if(node.leftChild === null && node.rightChild !== null){
                node.value = node.rightChild.value
                if (node.rightChild.leftChild !== null){
                node.leftChild = node.rightChild.leftChild
                }
                else{
                    node.rightChild = null
                }
                if(node.rightChild.rightChild !== null){    
                node.rightChild = node.rightChild.rightChild
                }
                else{
                    node.rightChild = null
                }
                return
            }
        //case 3: node has 2 children 
        else if(node.leftChild !== null && node.rightChild !== null){
            function findSuccesor(node,prev=null){                
                if(prev.rightChild === node && node.leftChild === null){
                    prev.rightChild = null
                    return node.value
                }
                if(node.leftChild === null){
                    prev.leftChild = null
                    return node.value
                }
                return findSuccesor(node.leftChild,node)
            }
            const newvalue = findSuccesor(node.rightChild,node)
            node.value = newvalue
        }
        }
         else{
             del(node.leftChild,node)
             del(node.rightChild,node)
         }
        

    }
    del(this.root)
  }
  find(value){
    function traverse(node){
        if(value === node.value){return node}
        if(value < node.value){
            if(node.leftChild === null){return null}
            return traverse(node.leftChild)
        }
        if(value > node.value){
            if(node.rightChild === null){return null}
            return traverse(node.rightChild)
        }
    }
  return traverse(this.root)
  }
  levelOrder(callback){
    if(typeof(callback !== 'function')){
        throw new Error('the argument must be a function');
    }
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
console.log('---------------------------')
prettyPrint(myTree.root);
console.log(myTree.find(7))
