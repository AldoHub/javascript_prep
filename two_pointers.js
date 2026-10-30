

// TWO POINTERS
// uses two index variables to traverse a linear data structure—such as an array, string, or linked list—simultaneously to solve problems in O(n) time and O(1) space

let numbers = [2, 7, 11, 15];
let targetNumber = 9;

function twoSum(nums, target) {
  // Pointer 1 starts at the beginning of the array
  let left = 0;

  // Pointer 2 starts at the end of the array
  let right = nums.length - 1;

  // Continue until the two pointers meet
  while (left < right) {
    // Calculate the sum of the two values
    const sum = nums[left] + nums[right];

    // If the sum equals the target, we found our answer
    if (sum === target) {
      return {
        values: [nums[left], nums[right]],
        indexes: [left, right]
      };
    }

    // If the sum is too small,
    // move the left pointer to the right
    // because the array is sorted
    if (sum < target) {
      left++;
    }

    // If the sum is too large,
    // move the right pointer to the left
    // to decrease the sum
    if (sum > target) {
      right--;
    }
  }

  // No pair was found
  return null;
}

console.log("Two Pointers: ", twoSum(numbers, targetNumber));


// given an interger array nums, move all 0s to the end of the array while maintaining the relative order of the non-zero elements

//Input: [0, 1, 0, 3, 12]
//output: [1, 2, 12, 0, 0]

function moveZeroes(nums) {
  let slow = 0;

  // Fast pointer scans every element
  for (let fast = 0; fast < nums.length; fast++) {

    // Only process non-zero elements
    if (nums[fast] !== 0) {

      // Swap the non-zero element into the next
      // available position
      [nums[slow], nums[fast]] = [nums[fast], nums[slow]];

      // Move slow to the next available position
      slow++;
    }
  }
}

// Example
const numbers2 = [0, 1, 0, 3, 12];
moveZeroes(numbers2);
console.log(numbers2); // [1, 3, 12, 0, 0]