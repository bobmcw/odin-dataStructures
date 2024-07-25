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
      len += bucket.getSize()
      }
    });
    return len
  }
  #grow() {
    //grow should create a new array of buckets instead of just changing the 
    //capacity value because all hashes should be recomputed or else they don't match
    console.log(`${this.capacity * this.load_factor} ${this.#length()}`)
    if (this.capacity * this.load_factor <= this.#length()) {
      const newMap = new hashmap(0.75,this.capacity*2)
      this.buckets.forEach(element => {
        for(let i=0;i<=element.getSize()-1;i++){
          const obj = element.getAtIndex(i)
          newMap.set(obj.key,obj.value)
        }
      });
      console.log('new hashmap:')
      newMap.buckets.forEach(element => {
        console.log(element)
      });
      this.buckets = newMap.buckets
      this.capacity = newMap.capacity
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
    //restrict accessing array out of capacity range
    if (hashed < 0 || hashed >= this.capacity) {
        throw new Error("Trying to access index out of bound");
      }
      //inserting into an empty bucket
    if (this.buckets[hashed] === undefined){
        this.buckets[hashed] = new LinkedList()
        this.buckets[hashed].append({'key':key,'value':value})
        this.#grow()
        return
    }
    //inserting into a non-empty bucket
    else{
        for(let i =0;i<=this.buckets[hashed].getSize()-1;i++){
            if(this.buckets[hashed].getAtIndex(i).key === key){
                this.buckets[hashed].removeAt(i)
                this.buckets[hashed].insertAt(i,{'key':key,'value':value})
                this.#grow()
                return
            }
        }
    }
        this.buckets[hashed].append({'key':key,'value':value})
        //this.buckets[hashed].toString()
        this.#grow()    
  }
  get(key){
    const hashed = this.hash(key) % this.capacity
    for(let i=0;i<=this.buckets[hashed].getSize();i++){
        console.log(this.buckets[hashed].getAtIndex(i))
        if(this.buckets[hashed].getAtIndex(i).key === key){
            return this.buckets[hashed].getAtIndex(i).value
        }
    return null
    }
  }
  has(key){
    const hashed = this.hash(key) % this.capacity
    for(let i=0;i<=this.buckets[hashed].getSize();i++){
        if(this.buckets[hashed].getAtIndex(i).key === key){
            return true
        }
        return false
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

 //myHashMap.buckets.forEach(element => {
 //   element.toString() 
 //});
 console.log(myHashMap.get('cup'))