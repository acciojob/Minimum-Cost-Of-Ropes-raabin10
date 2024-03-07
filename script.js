function calculateMinCost() {
    const ropeLengths = document.getElementById('rope-lengths').value.split(',').map(Number);
    if (ropeLengths.some(isNaN)) {
        document.getElementById('result').textContent = 'Invalid input. Please enter comma-separated integers.';
        return;
    }
    const minCost = calculateMinCostHelper(ropeLengths);
    document.getElementById('result').textContent = `Minimum cost: ${minCost}`;
}

function findMinCost(arr) {
  if (arr.length === 0) return 0;

  // sort the array in ascending order
  arr.sort((a, b) => a - b);

  let minCost = 0;
  while (arr.length > 1) {
    const rope1 = arr.shift();
    const rope2 = arr.shift();
    const cost = rope1 + rope2;
    minCost += cost;
    arr.push(cost);
  }

  return minCost;
}

