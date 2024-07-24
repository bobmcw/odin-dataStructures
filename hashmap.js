const LinkedList = require("./linkedList.js");
class hashmap {
  constructor(load_factor, capacity = 16) {
    this.load_factor = load_factor;
    this.buckets = [];
    this.capacity = capacity;
  }
  //length as in how many buckets contain a value, not how many values are stored in the hashmap
  #length(){
    let len = 0
    this.buckets.forEach(bucket => {
      if (bucket !== undefined) {
        len +=1
      }
    });
    return len
  }
  #grow() {
    if (this.capacity * this.load_factor <= this.#length()) {
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
    if (hashed < 0 || hashed >= this.capacity) {
        throw new Error("Trying to access index out of bound");
      }
    if (this.buckets[hashed] === undefined){
        this.buckets[hashed] = new LinkedList()
        this.buckets[hashed].append({'key':key,'value':value})
        return
    }
    else{
        for(let i =0;i<=this.buckets[hashed].getSize()-1;i++){
            if(this.buckets[hashed].getAtIndex(i).key === key){
                this.buckets[hashed].removeAt(i)
                this.buckets[hashed].insertAt(i,{'key':key,'value':value})
                return
            }
        }
    }
        this.buckets[hashed].append({'key':key,'value':value})
        this.buckets[hashed].toString()
        this.#grow()    
  }
  get(key){
    const hashed = this.hash(key) % this.capacity
    for(let i=0;i<=this.buckets[hashed].getSize();i++){
        if(this.buckets[hashed].getAtIndex(i).key === key){
            return this.buckets[hashed].getAtIndex(i).value
        }
    return null
    }
  }
}
myHashMap = new hashmap(0.75);
myHashMap.set('apple', 'red')
myHashMap.set('banana', 'yellow')
 myHashMap.set('carrot', 'orange')
 myHashMap.set('dog', 'brown')
 myHashMap.set('elephant', 'gray')
 myHashMap.set('frog', 'green')
 myHashMap.set('grape', 'purple')
 myHashMap.set('hat', 'black')
 myHashMap.set('ice cream', 'white')
 myHashMap.set('jacket', 'blue')
 myHashMap.set('kite', 'pink')
 myHashMap.set('lion', 'golden')
 myHashMap.set('cup', 'glass')
 myHashMap.set('plant', 'green')
 myHashMap.set('bottle', 'white')
 myHashMap.set('window', 'glass')
 myHashMap.set('apple','blue')

 myHashMap.buckets.forEach(element => {
    element.toString() 
 });
 console.log(myHashMap.get('apple'))