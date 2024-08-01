class Node {
  constructor(value) {
    this.value = value;
    this.leftChild = null;
    this.rightChild = null;
  }
}
class BinaryTree {
  constructor(values) {
    values.sort(function (a, b) {
      return a - b;
    });
    console.log(values);
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
  deleteItem(value) {
    function del(node, previousNode = null) {
      if (node === null) {
        return;
      }
      if (value === node.value) {
        //case 1: no children
        if (node.leftChild === null && node.rightChild === null) {
          if (previousNode.leftChild === node) {
            previousNode.leftChild = null;
          } else {
            previousNode.rightChild = null;
          }
          return;
        }
        //case2: one child
        else if (node.leftChild !== null && node.rightChild === null) {
          node.value = node.leftChild.value;
          if (node.leftChild.rightChild !== null) {
            node.rightChild = node.leftChild.rightChild;
          } else {
            node.rightChild = null;
          }
          if (node.leftChild.leftChild !== null) {
            node.leftChild = node.leftChild.leftChild;
          } else {
            node.leftChild = null;
          }
          return;
        } else if (node.leftChild === null && node.rightChild !== null) {
          node.value = node.rightChild.value;
          if (node.rightChild.leftChild !== null) {
            node.leftChild = node.rightChild.leftChild;
          } else {
            node.rightChild = null;
          }
          if (node.rightChild.rightChild !== null) {
            node.rightChild = node.rightChild.rightChild;
          } else {
            node.rightChild = null;
          }
          return;
        }
        //case 3: node has 2 children
        else if (node.leftChild !== null && node.rightChild !== null) {
          function findSuccesor(node, prev = null) {
            if (prev.rightChild === node && node.leftChild === null) {
              prev.rightChild = null;
              return node.value;
            }
            if (node.leftChild === null) {
              prev.leftChild = null;
              return node.value;
            }
            return findSuccesor(node.leftChild, node);
          }
          const newvalue = findSuccesor(node.rightChild, node);
          node.value = newvalue;
        }
      } else {
        del(node.leftChild, node);
        del(node.rightChild, node);
      }
    }
    del(this.root);
  }
  find(value) {
    function traverse(node) {
      if (value === node.value) {
        return node;
      }
      if (value < node.value) {
        if (node.leftChild === null) {
          return null;
        }
        return traverse(node.leftChild);
      }
      if (value > node.value) {
        if (node.rightChild === null) {
          return null;
        }
        return traverse(node.rightChild);
      }
    }
    return traverse(this.root);
  }
  levelOrder(callback) {
    if (typeof(callback) !== 'function') {
      throw new Error("the argument must be a function");
    }
    const queue = [this.root]
    function traverse(node=null){
        callback(queue[0])
        if(queue[0].rightChild !== null){
            queue.push(node.rightChild)
        }
        if(queue[0].leftChild !== null){
            queue.push(node.leftChild)
        }
        queue.shift()
        if(queue.length === 0){return}
        traverse(queue[0])
    }
    traverse(this.root)
  }
  inOrder(callback){
    if (typeof(callback) !== 'function') {
      throw new Error("the argument must be a function");
    }
    function traverse(node){
        if(node.leftChild !== null){
            traverse(node.leftChild)
        }
        callback(node)
        if(node.rightChild !== null){
            traverse(node.rightChild)
        }
    }
    traverse(this.root)
  }
  preOrder(callback){
    if (typeof(callback) !== 'function') {
      throw new Error("the argument must be a function");
    }
    function traverse(node){
        callback(node)
        if(node.leftChild !== null){
            traverse(node.leftChild)
        }
        if(node.rightChild !== null){
            traverse(node.rightChild)
        }
    }
    traverse(this.root)
  }
  postOrder(callback){
    if (typeof(callback) !== 'function') {
      throw new Error("the argument must be a function");
    }
    function traverse(node){
        if(node.leftChild !== null){
            traverse(node.leftChild)
        }
        if(node.rightChild !== null){
            traverse(node.rightChild)
        }
        callback(node)
    }
    traverse(this.root)
  }
  height(value){
    const node = this.find(value)
    if(node === null){return null}
    function maxDepth(node){
        if(node === null){return 0}
        let left
        let right
        if(node.leftChild === null){
            left = 0
        } 
        else{
            left = maxDepth(node.leftChild)
        }
        if(node.rightChild === null){
            right = 0
        }
        else{
            right = maxDepth(node.rightChild)
        }
        return Math.max(maxDepth(node.leftChild) , maxDepth(node.rightChild))+1
    }
    return maxDepth(node)
  }
  depth(value){
    const node = this.find(value)
    if(node === null){return null}
    function traverse(node,sum=0){
        if(node.value === value){return sum}
        if(node.value < value){return traverse(node.rightChild,sum+1)}
        else if(node.value > value){return traverse(node.leftChild,sum+1)}
    }
    return traverse(this.root)
  }
  isBalanced(){
    let balanced = true
    this.levelOrder((element)=>{
        let left
        let right
        if(element.leftChild === null){
            left = 0
        }
        else{
           left = this.height(element.leftChild.value)
        }
        if(element.rightChild === null){
            right = 0
        }
        else{
            right = this.height(element.rightChild.value)
        }
        if(Math.abs(right - left) > 1){balanced = false}
    })
    return balanced
}
rebalance(){
    const elements = []
    this.levelOrder((element)=>{
        elements.push(element.value)
    })
    const newTree = new BinaryTree(elements)
    this.root = newTree.root
}
}
