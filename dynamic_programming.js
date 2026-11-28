 // ---- MEMOIZATION

console.log("----DP MEMOIZATION")
//-FIBONACCI
// write a function 'fib(n)' that takes in a number as an argument. The function should return the n-th number of the Fibonnacci sequence

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


//-BESTSUM

//get the shortest combination that sums up to the targeSum

const bestSum = (targetSum, numbers, memo = {}) => {
  if(targetSum in memo) return memo[targetSum];
  if(targetSum === 0) return [];
  if(targetSum < 0) return null;

  let shortestCombo = null;

  for (let num of numbers) {
    const remainder = targetSum - num;
    const remainderCombo = bestSum(remainder, numbers, memo);
    if(remainderCombo !== null){
      const combination = [...remainderCombo, num];
      if(shortestCombo === null || combination.length < shortestCombo.length) {
        shortestCombo = combination;
      }
    }
  }

  memo[targetSum] = shortestCombo;
  return shortestCombo;

}

console.log("DP BESTSUM MEMOIZATION", bestSum(7, [5, 3, 4, 7])); // [7]
console.log("DP BESTSUM MEMOIZATION", bestSum(8, [2, 3, 5])); // [3, 5]
console.log("DP BESTSUM MEMOIZATION", bestSum(8, [1, 4, 5])); // [4, 4]
console.log("DP BESTSUM MEMOIZATION", bestSum(100, [1, 2, 5, 25])); // [25, 25, 25, 25]


//-CANCONSCTRUCT

// write a function canConstruct(target, wordBank) that accepts a target string and an array of strings
// the function should return a boolean indicating wheter or not the target can be constructed by concatenating elements of the wordBank array
// resuse elements of the wordBank as many times as needed

const canConstruct = (target, wordBank, memo = {}) => {
  if(target in memo) return memo[target];
  if(target === ''){
    //the word can be generated
    return true;
  }

  for(let word of wordBank){
    
    //if a word matches the start of the current target string
    if(target.indexOf(word) === 0){
      //get the rest of the target word after removing the current word iteration
      const suffix = target.slice(word.length);
      if(canConstruct(suffix, wordBank, memo)){
        memo[target] = true;
        return true;
      }
    }
  }
  memo[target] = false;
  return false;

}

console.log("DP CANCONSTRUCT WORD: ", canConstruct("abcdef", ["ab", "abc", "cd", "def", "abcd"])); // true
console.log("DP CANCONSTRUCT WORD: ", canConstruct("skateboard", ["bo", "rd", "ate", "t", "ska", "sk", "boar"])); // false
console.log("DP CANCONSTRUCT WORD: ", canConstruct("enterapotentpot", ["a", "p", "ent", "enter", "ot", "o", "t"])); // true
console.log("DP CANCONSTRUCT WORD: ", canConstruct("eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeef", ["e", "ee", "eee", "eeee", "eeeee", "eeeeee"])); // false

const countConstruct = (target, wordBank, memo = {}) => {
  if(target in memo) return memo[target];
  if(target === ''){
    //the word can be generated
    return 1;
  }

  let totalCount = 0;

  for(let word of wordBank){
     if(target.indexOf(word) === 0){
       const suffix = target.slice(word.length);
       const count = countConstruct(suffix, wordBank, memo)   
       totalCount += count;
      }
  }
  memo[target] = totalCount;
  return totalCount;
}

console.log("DP COUNTCONSTRUCT WORD: ", countConstruct("purple", ["purp", "p", "ur", "le", "purpl"])); // 2
console.log("DP COUNTCONSTRUCT WORD: ", countConstruct("abcdef", ["ab", "abc", "cd", "def", "abcd"])); // 1
console.log("DP COUNTCONSTRUCT WORD: ", countConstruct("skateboard", ["bo", "rd", "ate", "t", "ska", "sk", "boar"])); // 0
console.log("DP COUNTCONSTRUCT WORD: ", countConstruct("enterapotentpot", ["a", "p", "ent", "enter", "ot", "o", "t"])); // 4
console.log("DP COUNTCONSTRUCT WORD: ", countConstruct("eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeef", ["e", "ee", "eee", "eeee", "eeeee", "eeeeee"])); // 0


const allConstruct = (target, wordBank, memo = {}) => {
   if(target in memo) return memo[target];
   if(target === ''){
    //the word can be generated
    return [[]];
  }

  const result = [];
   for(let word of wordBank){
     if(target.indexOf(word) === 0){
        const suffix = target.slice(word.length);
        const suffixWays = allConstruct(suffix, wordBank, memo);
        const targetWays = suffixWays.map( way => [word, ...way]);
        result.push(...targetWays);
      }
   }
   memo[target]= result;
   return result;

}

console.log("DP ALLCONSTRUCT WORD: ", allConstruct("purple", ["purp", "p", "ur", "le", "purpl"])); // [ ['purp', 'le'], ['p', 'ur', 'p', 'le'] ]
console.log("DP ALLCONSTRUCT WORD: ", allConstruct("abcdef", ["ab", "abc", "cd", "def", "abcd", "ef", "c"])); // 
console.log("DP ALLCONSTRUCT WORD: ", allConstruct("skateboard", ["bo", "rd", "ate", "t", "ska", "sk", "boar"])); // 
console.log("DP ALLCONSTRUCT WORD: ", allConstruct("enterapotentpot", ["a", "p", "ent", "enter", "ot", "o", "t"])); // 
console.log("DP ALLCONSTRUCT WORD: ", allConstruct("eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeef", ["e", "ee", "eee", "eeee", "eeeee", "eeeeee"])); // 


console.log("----DP TABULATION")

//-FIBONACCI
const fibTab = (n) => {
  const table = Array(n+1).fill(0);
  table[1] = 1; //first value of fibonacci
  
  for(let i = 0; i <= n; i++){
    table[i + 1] += table[i]; //add to the next index
    table[i + 2] += table[i]; //add to the 2nd next item
  }

  return table[n];
}

console.log("FIB TABULATION: ", fibTab(6)); // 8
console.log("FIB TABULATION: ", fibTab(7)); // 13
console.log("FIB TABULATION: ", fibTab(8)); // 21
console.log("FIB TABULATION: ", fibTab(50)); // 12586269025


//-GRID TRAVELER
const gridTravelerTab = (m , n) => {
  //create the table
  const table = Array(m + 1)
  .fill()
  .map(()=> Array(n + 1 ).fill(0));
  //base case
  table[1][1] = 1;
  //console.log(table)
  //fill the table
  for(let i = 0; i<=m; i++ ) {
    for(let j = 0; j<=n; j++ ) {
      //get the current
      const current = table[i][j];
      //sum the values to the next and bottom items
      //based on the allowed movement right - bottom
      //check out of bounces for row and columns
      if(j + 1 <=n ) table[i][j+1] += current; //right
      if(i + 1 <=m ) table[i+1][j] += current; //bottom
    }
  }


  //return the bottom right corner
  return table[m][n];

}

console.log("GRID TRAVELER TABULATION: ", gridTravelerTab(1, 1)); // 1
console.log("GRID TRAVELER TABULATION: ", gridTravelerTab(2, 3)); // 3
console.log("GRID TRAVELER TABULATION: ", gridTravelerTab(3, 2)); // 3
console.log("GRID TRAVELER TABULATION: ", gridTravelerTab(3, 3)); // 6
console.log("GRID TRAVELER TABULATION: ", gridTravelerTab(18, 18)); // 2333606220



const canSumTab = (targetSum, numbers) => {
  const table = Array(targetSum + 1).fill(false);
  table[0] = true;

  for(let i = 0; i<=targetSum; i++){
    if(table[i] === true){
      for(let num of numbers){
        table[i + num] = true;
      }
    }
  }

  return table[targetSum];
}


console.log("CANSUM TAB: ", canSumTab(7, [2,3])); // true
console.log("CANSUM TAB: ", canSumTab(7, [5, 3, 4,7])); // true
console.log("CANSUM TAB: ", canSumTab(7, [2, 4])); // false
console.log("CANSUM TAB: ", canSumTab(8, [2, 3, 5])); // true
console.log("CANSUM TAB: ", canSumTab(300, [7, 14])); // false


const howSumTab = (targetSum, numbers) => { 
  const table = Array(targetSum + 1).fill(null);
  table[0] = [];

   for(let i = 0; i<=targetSum; i++){
    if(table[i] !== null){
      for(let num of numbers){
        table[i + num] = [...table[i], num];
      } 
    }
   }

  return table[targetSum]; 
}

console.log("HOWSUM TAB: ", howSumTab(7, [2,3])); // [3, 2, 2]
console.log("HOWSUM TAB: ", howSumTab(7, [5, 3, 4,7])); // [4, 3]
console.log("HOWSUM TAB: ", howSumTab(7, [2, 4])); // null
console.log("HOWSUM TAB: ", howSumTab(8, [2, 3, 5])); // [2, 2, 2, 2]
console.log("HOWSUM TAB: ", howSumTab(300, [7, 14])); // null


const bestSumTab = (targetSum, numbers) => { 
  const table = Array(targetSum + 1).fill(null);
  table[0] = [];

  for(let i = 0; i<=targetSum; i++){
    if(table[i] !== null){
      for(let num of numbers){
        const combo = [...table[i], num]
        //if this current combination is shorter that what is already stored
        if(table[i + num] == null || table[i + num].length > combo.length ){
          table[i + num] = combo;
        }
      } 
    }
  }

  return table[targetSum];
}

console.log("BESTSUM TAB: ", bestSumTab(7, [5, 3, 4, 7])); // [7]
console.log("BESTSUM TAB: ", bestSumTab(8, [2, 3, 5])); // [3, 5]
console.log("BESTSUM TAB: ", bestSumTab(8, [1, 4, 5])); // [4, 4]
console.log("BESTSUM TAB: ", bestSumTab(100, [1, 2, 5, 25])); // [25, 25, 25, 25]


const canConstructTab = (target, wordBank) => {
  const table = Array(target.length + 1).fill(null);
  table[0] = true;
  
  for(let i = 0; i<=target.length; i++) {
    if(table[i] === true) {
      for(let word of wordBank){
        //if the word matches the characters starting at position i
        if(target.slice(i, i + word.length) === word){
          table[i + word.length] = true;
        }
      }
    }
  }

  return table[target.length];

}

console.log("CANCONSTRUCT TAB WORD: ", canConstructTab("abcdef", ["ab", "abc", "cd", "def", "abcd"])); // true
console.log("CANCONSTRUCT TAB WORD: ", canConstructTab("skateboard", ["bo", "rd", "ate", "t", "ska", "sk", "boar"])); // false
console.log("CANCONSTRUCT TAB WORD: ", canConstructTab("enterapotentpot", ["a", "p", "ent", "enter", "ot", "o", "t"])); // true
console.log("CANCONSTRUCT TAB WORD: ", canConstructTab("eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeef", ["e", "ee", "eee", "eeee", "eeeee", "eeeeee"])); // false


const countConstructTab = (target, wordBank) => {
  const table = Array(target.length + 1).fill(0);
  table[0] = 1;
  
  for(let i = 0; i<=target.length; i++) {
      for(let word of wordBank){
        //if the word matches the characters starting at position i
        if(target.slice(i, i + word.length) === word){
          table[i + word.length] += table[i]
        }
      }
  }

  return table[target.length];
}

console.log("DP COUNTCONSTRUCT TAB WORD: ", countConstructTab("purple", ["purp", "p", "ur", "le", "purpl"])); // 2
console.log("DP COUNTCONSTRUCT TAB WORD: ", countConstructTab("abcdef", ["ab", "abc", "cd", "def", "abcd"])); // 1
console.log("DP COUNTCONSTRUCT TAB WORD: ", countConstructTab("skateboard", ["bo", "rd", "ate", "t", "ska", "sk", "boar"])); // 0
console.log("DP COUNTCONSTRUCT TAB WORD: ", countConstructTab("enterapotentpot", ["a", "p", "ent", "enter", "ot", "o", "t"])); // 4
console.log("DP COUNTCONSTRUCT TAB WORD: ", countConstructTab("eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeef", ["e", "ee", "eee", "eeee", "eeeee", "eeeeee"])); // 0


const allConstructTab = (target, wordBank) => {
  const table = Array(target.length + 1).fill().map(() => []);
  table[0] = [[]];

  for(let i = 0; i<=target.length; i++) {
    for(let word of wordBank){
       if(target.slice(i, i + word.length) === word){
        const newCombo = table[i].map(subArr => [...subArr, word] );
        table[i + word.length].push(...newCombo);
       }
    }
  }
  
  return table[target.length];
}

console.log("DP ALLCONSTRUCT TAB WORD: ", allConstructTab("purple", ["purp", "p", "ur", "le", "purpl"])); // [ ['purp', 'le'], ['p', 'ur', 'p', 'le'] ]
console.log("DP ALLCONSTRUCT TAB WORD: ", allConstructTab("abcdef", ["ab", "abc", "cd", "def", "abcd", "ef", "c"])); // 
console.log("DP ALLCONSTRUCT TAB WORD: ", allConstructTab("skateboard", ["bo", "rd", "ate", "t", "ska", "sk", "boar"])); // 
console.log("DP ALLCONSTRUCT TAB WORD: ", allConstructTab("enterapotentpot", ["a", "p", "ent", "enter", "ot", "o", "t"])); // 
//console.log("DP ALLCONSTRUCT TAB WORD: ", allConstructTab("eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeef", ["e", "ee", "eee", "eeee", "eeeee", "eeeeee"])); // 