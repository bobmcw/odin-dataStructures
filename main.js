const LinkedList = require('./linkedList.js')
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