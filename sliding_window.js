// given an array of positive integers nums and a positive integer target, return the minimal length of a subarray that sums up greater or equal to target.
// sum must be using consecutive elements of the array.
// Input: target = 7 nums = [2,3,1,2,4,3]
// Output: 2
// the  subarray [4, 3] sums up to 7 which is greater than or equal to the target 7

const target = 7;
const nums = [2, 3, 1, 2, 4, 3];

function minSubArrayLen(target, nums) {
  let left = 0;
  let sum = 0;

  let minLength = Infinity;
  let minSubArray = [];

  for (let right = 0; right < nums.length; right++) {
    // Expand the window
    sum += nums[right];

    // Shrink the window while the sum >= target
    while (sum >= target) {
      const currentLength = right - left + 1;

      // Save the shortest window and its elements
      if (currentLength < minLength) {
        minLength = currentLength;
        minSubArray = nums.slice(left, right + 1);
      }

      // Remove the leftmost element
      sum -= nums[left];
      // Move the window to the right by removing the leftmost element
      left++;
    }
  }

  // No valid subarray found
  if (minLength === Infinity) {
    return {
      length: 0,
      subArray: []
    };
  }

  return {
    length: minLength,
    subArray: minSubArray
  };
}

console.log("Sliding Window: ", minSubArrayLen(target, nums));



// given an array consisting of n integers, find the contiguous subarray of given length k that has the MAXIMUM AVERAGE VALUE. Output the max average value

function findMaxAverage(nums, k) {
  let sum = 0;
  let left = 0;
  let right = k

  //calculate the average while moving the window
  for(let i = 0; i < k; i++){
    sum += [i];
  }

  //average
  let maxAverage = sum / k;

  while (right < nums.length){
    //as we go remove the old one and add the next one, until we reach the end of the array
    sum = sum - nums[left] + nums[right];
    maxAverage = Math.max(maxAverage, sum / k); //get the max from the current sum and the previous calculated sum
    //move the pointers - hence move the window
    left++;
    right++;

  }

  return maxAverage;

}

const nums2 = [1, 12, -5, -6, 50, 3];
const k = 4;
console.log("sliding window: ", findMaxAverage(nums2, k)); //output 12.75 using [12, -5, -6, 50]


// VARIABLE SLIDING WINDOW

// find the smallest contiguous subarray with a sum greater or eaual  to a give value s

function minSubArrayLen2(s, nums) {

  let left = 0;
  let sum = 0;
  let minLength = Infinity;


  for(let right = 0; right < nums.length; right++) {
    sum += nums[right];
    //while the sum is greater or equal to the target value - shrink the window
    while(sum >= s) {
      minLength = Math.min(minLength, right - left + 1);
      sum -= nums[left]
      left++;
    }
  }

  return minLength === Infinity ? 0 : minLength;

}

const s = 11;
const nums3 = [1, 1, 1, 1, 1, 1, 1, 10];
console.log(minSubArrayLen2(s, nums3));