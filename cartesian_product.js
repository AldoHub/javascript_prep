/*--- CARTESIAN PRODUCT O(m*n) if array not equal - O(n^2) if array equal ---*/

//--- given two finite non-empty sets, find their Cartesian Product
// cartesian product of two sets A and B is the set of all ordered pairs (a, b) where a is in A and b is in B

function cartesianProduct(A, B) {
    let result = [];
    //just traverse the two arrays and push the result
    for (let a of A) {
        for (let b of B) {
            result.push([a, b]);
        }
    }
    return result;
}

let A = [1, 2, 3];
let B = [4, 5, 6];

console.log("CARTESIAN PRODUCT OF A AND B: ", cartesianProduct(A, B));