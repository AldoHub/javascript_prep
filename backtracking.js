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

function permutations(nums) { // Define a function that takes an array of numbers.
  const result = []; // Store all completed permutations.
  const current = []; // Build one permutation at a time.
  const used = Array(nums.length).fill(false); // Track which array positions are already in the current permutation.

  function backtrack() { // Explore possible choices recursively.
    
    if (current.length === nums.length) { // Check whether the current permutation uses every number.
      result.push([...current]); // Save a copy so later changes to current don't affect it.
      console.log("BACKTRACKING (PERMUTATIONS): ", current, used); // Log the current state of the permutation and used positions.
      return; // Stop exploring this completed permutation.
    } // End the completion check.

    for (let i = 0; i < nums.length; i++) { // Try each position in the input array.
      if (used[i]) continue; // Skip this number if it is already in the current permutation.

      used[i] = true; // Mark this position as chosen.
      current.push(nums[i]); // Add its number to the current permutation.

      backtrack(); // Recursively choose the next number.

      current.pop(); // Remove the last number to undo the choice.
      used[i] = false; // Mark this position as available for another permutation.
    } // End the loop over input positions.
  } // End the backtracking function.

  backtrack(); // Start building permutations from an empty array.
  return result; // Return all completed permutations.
} // End the permutations function.

console.log("PERMUTATIONS: ", permutations([1, 2, 3])); // Print all permutations of 1, 2, and 3.
// [[1, 2, 3], [1, 3, 2], [2, 1, 3],
//  [2, 3, 1], [3, 1, 2], [3, 2, 1]]