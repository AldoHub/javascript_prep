// ---- DFS

// N-QUEENS
// The n-queens puzzle is the problem of placing n queens on an n x n chessboard such that no two attack each other
// given an integer n, return all distinct solutions to the n-queens' placement, where 'Q' and '.' both indicate a queen and an empty space, respectively

//Input: n = 4
//Output: [[".Q..", "...Q", "Q...", "..Q."], ["..Q.", "Q...", "...Q", ".Q.."]]
//Explanation: there exist two distinct solutions to the 4-queens puzzle


let solveNQueens = function (n){
    if(n.length === 1) return [["Q"]];

    //make the sets
    let col = new Set();
    let positiveDiag = new Set();
    let negativeDiag = new Set();
    //response array
    let res = [];
    //make the board based on the n integer and fill it with dots initially
    let board = Array.from(Array(n), () => new Array(n).fill("."));

    //check the position is valid - if there is an occupied position
    const isValid = (_row, _col) => !(col.has(_col) || positiveDiag.has(_row + _col) || negativeDiag.has(_row - _col))

    //add the queen
    const addQueen = (_row, _col) => {
        col.add(_col);
        //will create a mirror of the positions
        positiveDiag.add(_row + _col);
        negativeDiag.add(_row - _col);
        board[_row][_col] = "Q";
    }

    //remove the queen
    const removeQueen = (_row, _col) => {
        col.delete(_col);
        positiveDiag.delete(_row + _col);
        negativeDiag.delete(_row - _col);
        board[_row][_col] = ".";
    }

    //recursive backtracking
    function recurse(row){
        //base case
        if(row === n){
            //make a new board
            res.push([...board].map((row) => {
                return row.join("");
            }))
        }

        //recurrence relation
        for(let col = 0; col<n; col++) {
            if(isValid(row, col)) {
                addQueen(row, col);
                //recurse
                recurse(row+1);
                //backtrack
                removeQueen(row, col);
            }
        }
    }

    recurse(0); //start from the first row
    return res;
}


console.log("N-QUEENS: ", solveNQueens(4));


// N-QUEENS 2
// given an integer n return the number of distinct solutions to the n-queens puzzle

let totalNQueens = function(n) {
    //make the sets
    let col = new Set();
    let positiveDiag = new Set();
    let negativeDiag = new Set();

    let count = 0;
    
    //check the position is valid - if there is an occupied position
    const isValid = (_row, _col) => !(col.has(_col) || positiveDiag.has(_row + _col) || negativeDiag.has(_row - _col))

    //add the queen
    const addQueen = (_row, _col) => {
        col.add(_col);
        //will create a mirror of the positions
        positiveDiag.add(_row + _col);
        negativeDiag.add(_row - _col);
    }

    //remove the queen
    const removeQueen = (_row, _col) => {
        col.delete(_col);
        positiveDiag.delete(_row + _col);
        negativeDiag.delete(_row - _col);
    }


    function recurse(row){
        //base case
        if(row === n){
            count++;
        }

        //recurrence relation
        for(let col = 0; col<n; col++) {
            if(isValid(row, col)) {
                addQueen(row, col);
                count = recurse(row +1 , count);
                removeQueen(row, col);
            }
        }

        return count;
    }

    return recurse(0);
}

console.log("N-QUEENS-TOTAL: ", totalNQueens(4));
//output: 2

