//A classic JavaScript example is generating all possible combinations from an array. [1, 2, 3]

function subsets(nums) {
  const result = [];
  const current = [];

  function backtrack(start) {
    // Add the current combination to the results
    result.push([...current]);
    //console.log(current);
    
    // Try every possible next number
    for (let i = start; i < nums.length; i++) {

      // 1. Choose
      current.push(nums[i]);
        
      // 2. Explore
      backtrack(i + 1);
    
      // 3. Undo the choice (backtrack)
      current.pop();
      
    }
  }

  backtrack(0);

  return result;
}

console.log("BACKTRACKING (SUBSETS): ", subsets([1, 2, 3]));
// [[1, 2, 3], [1, 2], [1, 3], [2, 3], [1], [2], [3], []]

//    []
//    │
//    ├── [1]
//    │   ├── [1, 2]
//    │   │   └── [1, 2, 3]
//    │   │
//    │   └── [1, 3]
//    │
//    ├── [2]
//    │   └── [2, 3]
//    │
//    └── [3]



function generateParenthesis(n) {
  const result = [];

  function backtrack(current, open, close) {
    // Base case: all parentheses have been added
    if (current.length === n * 2) {
      result.push(current);
      return;
    }

    // Add an opening parenthesis if we have some remaining
    if (open < n) {
      backtrack(current + "(", open + 1, close);
    }

    // Add a closing parenthesis only if it stays valid
    if (close < open) {
      backtrack(current + ")", open, close + 1);
    }
  }

  backtrack("", 0, 0);

  return result;
}

console.log(generateParenthesis(3));

//output:  ["((()))", "(()())", "(())()", "()(())", "()()()"]