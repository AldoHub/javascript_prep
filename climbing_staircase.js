/*--- CLIMBING STAIRCASE O(n) ---*/

//--- given a staircase with n steps, find the number of ways to climb to the top
// at any point, assuming you can climb either 1 or 2 steps at a time
// if n is even, the number of ways is n/2 * 2
// if n is odd, the number of ways is (n-1)/2 * 2 + 1
// if n is 1, the number of ways is 1

function climbingStairs(n) {
    let ways = [1, 2];
    //calculate the number of ways for each step - start from the second step
    for (let i = 2; i <= n; i++) {
        ways[i] = ways[i - 1] + ways[i - 2];
    }

    //since array is zero based, subtract 1 from n
    return ways[n - 1];
}


console.log("CLIMBING STAIRCASE: ", climbingStairs(1));
console.log("CLIMBING STAIRCASE: ", climbingStairs(2));
console.log("CLIMBING STAIRCASE: ", climbingStairs(3));
console.log("CLIMBING STAIRCASE: ", climbingStairs(4));
console.log("CLIMBING STAIRCASE: ", climbingStairs(5));