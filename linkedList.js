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
   toString(){
    if (this.head === null){
        console.log("list is empty")
        return
    }
   function print(node){
        if (node.nextNode === null){
            console.log(node.value)
            return
        }
        else{
            console.log(node.value)
            print(node.nextNode)
        }
   } 
   print(this.head)
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
myList.toString()

