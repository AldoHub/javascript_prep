// 0/1 KNAPSACK PROBLEM

//BOTTOM UP
function knapsack(items, capacity) {
    //dp[c] stores the max value achievable, with a backpack capacity of c
    const dp = new Array(capacity + 1).fill(0);
    
    //process each item once
    for (const item of items) {
        const {weight, value} = item;
  
        //iterate backwards so the current item cannot be used more than once
        for (let c = capacity; c >= weight; c--) {
            //Option 1: Do not take the current item.
            //Its value is already stored in dp[c].
            
            //Option 2: Take the current item.
            const valueWithItem = dp[c-weight] + value;
            // Keep whichever option gives the greater value.
            dp[c] = Math.max(dp[c], valueWithItem);
        }
  
    }
     // The maximum value for the full capacity.    
    return dp[capacity];
}


function knapsackWithItems(items, capacity) {
  // Store the maximum value achievable for each capacity.
  const dp = new Array(capacity + 1).fill(0);

  // Track the selected item indexes for each capacity.
  const selected = Array.from(
    { length: capacity + 1 },
    () => []
  );

  // Process each item once.
  for (let i = 0; i < items.length; i++) {
    const { weight, value } = items[i];

    // Iterate backwards to avoid using an item more than once.
    for (let c = capacity; c >= weight; c--) {
      // Calculate the value if we include this item.
      const valueWithItem = dp[c - weight] + value;

      // Update only if including the item improves the result.
      if (valueWithItem > dp[c]) {
        dp[c] = valueWithItem;

        // Copy the previous selection and add this item.
        selected[c] = [...selected[c - weight], i];
      }
    }
  }

  // Convert the selected indexes into the actual items.
  const selectedItems = selected[capacity].map(
    index => items[index]
  );

  return {
    maxValue: dp[capacity],
    totalWeight: selectedItems.reduce(
      (total, item) => total + item.weight,
      0
    ),
    items: selectedItems
  };
}



// Example
const items = [
  { weight: 1, value: 1 },
  { weight: 3, value: 4 },
  { weight: 4, value: 5 },
  { weight: 5, value: 7 }
];

const capacity = 7;

console.log("0/1 KNAPSACK: ", knapsack(items, capacity)); // 9
console.log("0/1 KNAPSACKWITHITEMS: ", knapsackWithItems(items, capacity)); // 9



//TOP TO BOTTOM
function knapsack2(weights, values, capacity){
    const n = weights.length;
    const dp = Array.from({length: n + 1}, () => Array(capacity + 1).fill(0));

    for(let i = 1; i<= n; i++){ //values
        for(let w = 0; w <=capacity; w++) { //weights
            //check if such item can go into the sack with its weight
            
            //decide to incluede them or not,
            if(weights[i - 1] <= w){ // if the item is less or equal to the current capacity
                dp[i][w] = Math.max(
                    values[i-1] + dp[i - 1][w - weights[i-1]], //value of the current item sumed to the other values weh hve
                    dp[i-1][w] //best value we can get from this item
                ) // take the max of the 2 options
            }else{
                //item doesnt fit, get the value from the previous row
                dp[i][w] = dp[i -1][w];
            }
            
        }
    }

    //return the bottom right corner
    return dp[n][capacity];
}

const weights = [1, 2, 3];
const values = [10, 15, 40];
const capacity2 = 5;

console.log("KNAPSACK 2: ", knapsack2(weights, values, capacity2))