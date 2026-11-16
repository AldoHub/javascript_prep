// COIN CHANGE

//The Coin Change problem is a classic dynamic programming problem frequently asked in JavaScript coding interviews. The key is to find the minimum number of coins needed to make a given amount.
//Given an array of coin denominations coins and an integer amount, return the fewest number of coins needed to make that amount. If it's impossible, return -1.

function coinChange(coins, amount) {
  // dp[i] = minimum coins needed to make amount i
  const dp = new Array(amount + 1).fill(Infinity);

  // Base case: zero coins are needed to make amount 0
  dp[0] = 0;

  // Calculate the minimum coins for every amount
  for (let currentAmount = 1; currentAmount <= amount; currentAmount++) {

    // Try every available coin
    for (const coin of coins) {

      // Only use the coin if it does not exceed the amount
      if (coin <= currentAmount) {
        dp[currentAmount] = Math.min(
          dp[currentAmount],
          dp[currentAmount - coin] + 1
        );
      }
    }
  }

  // Return -1 if the amount cannot be reached
  return dp[amount] === Infinity ? -1 : dp[amount];
}

console.log(coinChange([1, 2, 5], 11)); // 3
console.log(coinChange([2], 3));        // -1
console.log(coinChange([1], 0));        // 0


function coinChangeWithValues(coins, amount) {
  // dp[i] = minimum number of coins needed for amount i
  const dp = new Array(amount + 1).fill(Infinity);

  // Store the last coin used to make each amount
  const lastCoin = new Array(amount + 1).fill(-1);

  // Base case: zero coins are needed for amount 0
  dp[0] = 0;

  // Calculate the minimum coins for each amount
  for (let currentAmount = 1; currentAmount <= amount; currentAmount++) {
    for (const coin of coins) {
      if (coin <= currentAmount) {
        const previousAmount = currentAmount - coin;
        const candidate = dp[previousAmount] + 1;

        // Update only when we find a better solution
        if (candidate < dp[currentAmount]) {
          dp[currentAmount] = candidate;
          lastCoin[currentAmount] = coin;
        }
      }
    }
  }

  // Return -1 if the amount cannot be reached
  if (dp[amount] === Infinity) {
    return {
      count: -1,
      coins: []
    };
  }

  // Reconstruct the coins used in the solution
  const usedCoins = [];
  let currentAmount = amount;

  while (currentAmount > 0) {
    const coin = lastCoin[currentAmount];

    usedCoins.push(coin);
    currentAmount -= coin;
  }

  return {
    count: dp[amount],
    coins: usedCoins
  };
}

// Example
console.log(coinChangeWithValues([1, 2, 5], 11));

// Output:
// {
//   count: 3,
//   coins: [5, 5, 1]
// }

