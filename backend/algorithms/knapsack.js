/*
 0/1 Knapsack Algorithm for Rescue Resource Optimizer
 
 Input: items array (weight, benefit, name), capacity
 Output: max benefit, selected items
 Time Complexity: O(n * W)
 Space Complexity: O(n * W)
*/

function runKnapsack(items, capacity) {
  const n = items.length;
  const dp = Array(n + 1).fill(0).map(() => Array(capacity + 1).fill(0));

  for (let i = 1; i <= n; i++) {
    const item = items[i - 1];
    for (let w = 1; w <= capacity; w++) {
      if (item.weight <= w) {
        dp[i][w] = Math.max(dp[i - 1][w], item.benefit + dp[i - 1][w - item.weight]);
      } else {
        dp[i][w] = dp[i - 1][w];
      }
    }
  }

  // Backtrack to find selected items
  let res = dp[n][capacity];
  let w = capacity;
  const selected = [];

  for (let i = n; i > 0 && res > 0; i--) {
    if (res === dp[i - 1][w]) {
      continue;
    } else {
      selected.push(items[i - 1]);
      res -= items[i - 1].benefit;
      w -= items[i - 1].weight;
    }
  }

  return {
    algorithm: "0/1 Knapsack",
    maxBenefit: dp[n][capacity],
    selectedItems: selected.reverse(),
    timeComplexity: "O(n * W)",
    spaceComplexity: "O(n * W)"
  };
}

module.exports = runKnapsack;
