const BST = require('./binaryTreeTraversal')

class chessGraph{

    getBoard(){
        const board = []
        for(let i=0;i<8;i++){
            for(let j=0;j<8;j++){
                board.push([i,j])
            }
        }
        return board
    }
    getAdjencyList(){
        function Inrange(element,min=0,max=7){
            return (element >= min && element <= max)
        }
        const list = []
        const board = this.getBoard()
        board.forEach((element,index) => {    
            const connections = []
        //case 1 2 up 1 left
            if(Inrange(element[0]-2) && Inrange([element[1]]-1)){
                connections.push(index-17)
            }
        //case 2 2 up 1 right
            if(Inrange(element[0]-2) && Inrange(element[1]+1)){
                connections.push(index-15)
            }
        //case 3 1 up 2 right
            if(Inrange(element[0]-1) && Inrange(element[1]+2)){
                connections.push(index-6)
            }
        //case 4 1 down 2 right
            if(Inrange(element[0]+1) && Inrange(element[1]+2)){
                connections.push(index+10)
            }
        //case 5 2 down 1 right
            if(Inrange(element[0]+2) && Inrange(element[1]+1)){
                connections.push(index+17)
            }
        //case 6 2 down 1 left
            if(Inrange(element[0]+2) && Inrange(element[1]-1)){
                connections.push(index+15)
            }
        //case 7 1 up 2 left
            if(Inrange(element[0]-1) && Inrange(element[1]-2)){
                connections.push(index-10)
            }
        //case 8 1 down 2 left
            if(Inrange(element[0]+1) && Inrange(element[1]-2)){
                connections.push(index+6)
            }
            list.push(connections)
        });
        return list
    }
}
const test = new chessGraph()
//console.log(test.getBoard())
console.log(test.getAdjencyList())