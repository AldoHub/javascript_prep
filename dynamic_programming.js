 // ---- MEMOIZATION


//-FIBONACCI
// write a function 'fib(n)' that takes in a number as an argument. The function should return the n-th number of the Fibonnacci sequence

console.log("----DP MEMOIZATION")

const fib = (n, memo = {}) => {
  //see if we already have a value stored for that key
  if(n in memo) return memo[n];
  //return the base case
  if(n <= 2 ) return 1;
  //store the result in case is not there before
  //pass the memo object recursively
  memo[n] = fib(n-1, memo) + fib(n-2, memo);
  return memo[n];
}


console.log("DP FIB MEMOIZATION: ", fib(6))
console.log("DP FIB MEMOIZATION: ", fib(7))
console.log("DP FIB MEMOIZATION: ", fib(8))
console.log("DP FIB MEMOIZATION: ", fib(50))


//-GRID TRAVELER
// say you are a traveler on a 2D grid. You begin in the top-left corner and your goal is to travel to the bottom-right corner
// You may onlu move down and right
// In how many ways you can travel to the goal ona grid with dimensions m * n
// write a function gridTraveler(m,n) that calculates this

//there are only 2 posible ways to move to another part of the grid - right or down = 2 ways of moving accross the grid
const gridTraveler = (m, n, memo={}) => { 
  const key = `${m},${n}`;
  //check if the key is already on the memo
  if(key in memo) return memo[key];

  //grid is 1x1 only 1 way to move
  if(m==1 && n==1) return 1;
  //grid has any zero value, means cannot build a proper grid
  if(m==0 || n==0) return 0;

  //store the key value pair
  memo[key] = gridTraveler(m-1, n, memo) + gridTraveler(m, n-1, memo); //will be the result of taking both paths, down or right
  return memo[key];

}


console.log("GRID TRAVELER MEMOIZATION: ", gridTraveler(1, 1)) //1
console.log("GRID TRAVELER MEMOIZATION: ", gridTraveler(2, 3)) //3
console.log("GRID TRAVELER MEMOIZATION: ", gridTraveler(3, 2)) //3
console.log("GRID TRAVELER MEMOIZATION: ", gridTraveler(3, 3)) //6
console.log("GRID TRAVELER MEMOIZATION: ", gridTraveler(18, 18)) //2333606220



//-CANSUM
// write a function 'canSum(targetSum, numbers)' that takes in a target sum and an array of numbers
// as arguments. The function should return a boolean indicating whether or not it is possible to generate
// the targetSum using numbers from the array
// you may use an element of the array as many times as needed
// you may assume all input numbers are nonnegative

//the idea will be to substract the numbers and see if we reach 0, that way we now the target number is achievable
const canSum = (targetSum, numbers, memo = {}) => {
  if(targetSum in memo) return memo[targetSum];
  if(targetSum === 0) return true;
  if(targetSum < 0) return false;
  
  //update the targetSum as we go using the numbers
  for(let num of numbers){
    const remainder = targetSum - num;
    if(canSum(remainder, numbers, memo) === true){
      memo[targetSum] = true;
      return true;
    }
  }

  //after the loop is done, no trues, then return false
  memo[targetSum] = false;
  return false;
}

console.log("DP CANSUM MEMOIZATION: ", canSum(7, [2, 3])); // true
console.log("DP CANSUM MEMOIZATION: ", canSum(7, [5, 3, 4, 7])); // true
console.log("DP CANSUM MEMOIZATION: ", canSum(7, [2, 4])); // false
console.log("DP CANSUM MEMOIZATION: ", canSum(8, [2, 3, 5])); // true
console.log("DP CANSUM MEMOIZATION: ", canSum(300, [7, 14])); // false


//-HOWSUM
//write a function howSum(targetSum, numbers) that takes in a targetSum and an array of numbers as arguments
//the function should return an array containing any combination of elements that add up exactly to the targetSum. If there is no combination
//that adds up to the targetSum, then return null

const howSum = (targetSum, numbers, memo = {}) => {
  if(targetSum in memo) return memo[targetSum];
  if(targetSum === 0) return [];
  if(targetSum < 0) return null;

  for (let num of numbers) {
    const remainder = targetSum - num;
    const remainderResult = howSum(remainder, numbers, memo);
    if(remainderResult !== null){
      memo[targetSum] = [...remainderResult, num];
      return memo[targetSum];
    }
  }

  memo[targetSum] = null;
  return null;

}


console.log("DP HOWSUM MEMOIZATION: ", howSum(7, [2, 3])); // true
console.log("DP HOWSUM MEMOIZATION: ", howSum(7, [5, 3, 4, 7])); // true
console.log("DP HOWSUM MEMOIZATION: ", howSum(7, [2, 4])); // false
console.log("DP HOWSUM MEMOIZATION: ", howSum(8, [2, 3, 5])); // true
console.log("DP HOWSUM MEMOIZATION: ", howSum(300, [7, 14])); // false

//1:52:09

//-BESTSUM