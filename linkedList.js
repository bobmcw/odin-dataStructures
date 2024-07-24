module.exports = class LinkedList {
  constructor() {
    this.head = null;
  }
  append(value) {
    if (this.head === null) {
      this.head = new Node(value);
    } else {
      function goToNextNode(node) {
        if (node.nextNode === null) {
          node.nextNode = new Node(value);
          return;
        } else {
          goToNextNode(node.nextNode);
        }
      }
      goToNextNode(this.head);
    }
  }
  prepend(value) {
    if (this.head === null) {
      this.head = new Node(value);
    } else {
      const temp = this.head;
      this.head = new Node(value);
      this.head.nextNode = temp;
    }
  }
  toString() {
    if (this.head === null) {
      console.log("list is empty");
      return;
    }
    function print(node, stringrep = "") {
        if(node.nextNode === null && stringrep === ""){
            stringrep = node.value
            console.log(stringrep)
            return
        }
      if (node.nextNode === null) {
        stringrep = stringrep + " -> " + node.value;
        console.log(stringrep);
        return;
      } else {
        if (stringrep === "") {
          stringrep = node.value;
        } else {
          stringrep = stringrep + " -> " + node.value;
        }
        print(node.nextNode, stringrep);
      }
    }
    print(this.head);
  }
  getSize() {
    if (this.head === null) {
      return 0;
    }
    function findSize(node, current = 0) {
      if (node.nextNode === null) {
        current += 1;
        return current;
      }
      current += 1;
      return findSize(node.nextNode, current);
    }
    return findSize(this.head);
  }
  getHead() {
    return this.head.value;
  }
  getTail() {
    function findLast(node) {
      if (node.nextNode === null) {
        return node.value;
      }
      return findLast(node.nextNode);
    }
    return findLast(this.head);
  }
  getAtIndex(index) {
    if (index > this.getSize()) {
      throw new Error("index out of range");
    }
    function find(node, current = 0) {
      if (current === index) {
        return node.value;
      }
      current += 1;
      return find(node.nextNode, current);
    }
    return find(this.head);
  }
  pop() {
    if (this.head.nextNode === null) {
      this.head = null;
    }
    function findSecondToLast(node, previous = null) {
      if (node.nextNode === null) {
        return previous;
      }
      return findSecondToLast(node.nextNode, node);
    }
    const newLast = findSecondToLast(this.head);
    newLast.nextNode = null;
  }
  contains(value) {
    if (this.head === null) {
      return false;
    }
    function isValue(node) {
      if (node.value === value) {
        return true;
      } else if (node.nextNode === null) {
        return false;
      } else {
        return isValue(node.nextNode);
      }
    }
    return isValue(this.head);
  }
  find(value) {
    if (this.head === null) {
      return null;
    }
    function helper(node, index = 0) {
      if (node.value === value) {
        return index;
      }
      if (node.nextNode === null) {
        return null;
      }
      return helper(node.nextNode, index + 1);
    }
    return helper(this.head);
  }
  insertAt(index, value) {
    if (index === 0) {
      this.prepend(value);
      return;
    }
    //arrow functions dont have their own 'this' which allows us access to the object inside the function
    const goToIndex = (node, previous = null, current = 0) => {
      if (current === index) {
        const inserted = new Node(value);
        inserted.nextNode = node;
        previous.nextNode = inserted;
        return
      } else if (node.nextNode === null) {
            this.append(value)
            return
        }
        goToIndex(node.nextNode, node, current + 1);
      }
      goToIndex(this.head)
    }
    removeAt(index){
        if(index === 0){
            this.head = this.head.nextNode
            return
        }
        function goToIndex(node,previous=null,current=0){
            if(current === index){
                previous.nextNode = node.nextNode
                return
            }
            else if(node.nextNode === null){
                throw new Error("index out of range")
            }
            goToIndex(node.nextNode,node,current+1)
        }
        goToIndex(this.head)
    }
  }

class Node {
  constructor(value) {
    this.value = value;
    this.nextNode = null;
  }
}


