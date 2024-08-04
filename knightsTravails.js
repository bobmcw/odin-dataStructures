const BST = require('./binaryTreeTraversal')

class chessGraph{

    getBoard(){
        const board = []
        for(let i=0;i<8;i++){
            const row = []
            for(let j=0;j<8;j++){
                row.push([i,j])
            }
            board.push(row)
        }
        return board
    }
}
const test = new chessGraph()
console.log(test.getBoard())