 class LinkedList {
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
    goToNextNode(this.head)
    }
  }
  prepend(value){
    if (this.head === null) {this.head = new Node(value)}
    else{
    const temp = this.head
    this.head = new Node(value)
    this.head.nextNode = temp
    }

  }
   toString(){
    if (this.head === null){
        console.log("list is empty")
        return
    }
   function print(node, stringrep = ""){
        if (node.nextNode === null){
            stringrep = stringrep + ' -> ' + node.value
            console.log(stringrep)
            return
        }
        else{
            if (stringrep === "") {stringrep = node.value}
            else{
            stringrep = stringrep + ' -> ' + node.value
            }
            print(node.nextNode, stringrep)
        }
   } 
   print(this.head)
  }
  getSize(){
    if (this.head === null){return 0}
   function findSize(node, current=0){
    if(node.nextNode === null){
        current += 1
        return current
    } 
    current += 1
    return findSize(node.nextNode,current)
   } 
   return findSize(this.head)
  }
  getHead(){
    return this.head.value
  }
  getTail(){
    function findLast(node){
        if (node.nextNode === null){return node.value}
        return findLast(node.nextNode)
    }
    return findLast(this.head)
  }
  getAtIndex(index){
    if (index > this.getSize()){throw new Error("index out of range")}
    function find(node, current=0){
        if (current === index){
            return node.value
        }
        current+= 1
        return find(node.nextNode,current)
    }
    return find(this.head)
  }
  pop(){
    if(this.head.nextNode === null){this.head = null}
    function findSecondToLast(node,previous=null){
        if (node.nextNode === null){return previous}
        return findSecondToLast(node.nextNode,node)
    }
    const newLast = findSecondToLast(this.head)
    newLast.nextNode = null
  }
}
class Node {
  constructor(value) {
    this.value = value;
    this.nextNode = null;
  }
}



myList = new LinkedList
myList.append('cat')
myList.append('dog')
myList.append('cow')
myList.prepend('horse')
myList.toString()
console.log(myList.getHead())
console.log(myList.getTail())
console.log(myList.getSize())
console.log(myList.getAtIndex(2))
myList.pop()
myList.toString()

