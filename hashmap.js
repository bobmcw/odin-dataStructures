const LinkedList = require("./linkedList.js");
class hashmap {
  constructor(load_factor, capacity = 16) {
    this.load_factor = load_factor;
    this.buckets = [];
    this.capacity = capacity;
  }
  grow() {
    if (this.capacity * this.load_factor <= this.buckets.length) {
      this.capacity = this.capacity * 2;
    }
  }
  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
    }

    return hashCode;
  }
  set(key, value) {
    const hashed = this.hash(key) % this.capacity
    if (hashed < 0 || hashed >= buckets.length) {
        throw new Error("Trying to access index out of bound");
      }
    if (this.buckets[hashed] === undefined){
        this.buckets[hashed] = new LinkedList()
        this.buckets[hashed].append([key,value])
        this.buckets[hashed].toString()
    }
    this.grow()    
  }
}
myHashMap = new hashmap(0.75);
myHashMap.set('apple', 'red')
