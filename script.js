function calculateMinCost() {
    const ropeLengths = document.getElementById('rope-lengths').value.split(',').map(Number);
    
    // Check if the input contains valid numbers
    if (ropeLengths.some(isNaN)) {
        document.getElementById('result').textContent = 'Invalid input. Please enter comma-separated integers.';
        return;
    }

    // Call the findMinCost function to calculate the minimum cost
    const minCost = findMinCost(ropeLengths);

    // Display the result in the specified div
    document.getElementById('result').textContent = `Minimum cost: ${minCost}`;
}

function findMinCost(arr) {
    if (arr.length === 0) return 0;

    // Sort the array in ascending order
    arr.sort((a, b) => a - b);

    let minCost = 0;
    while (arr.length > 1) {
        const rope1 = arr.shift();
        const rope2 = arr.shift();
        const cost = rope1 + rope2;
        minCost += cost;
        arr.push(cost);
        arr.sort((a, b) => a - b); // Maintain the sorted order after pushing the new cost
    }

    return minCost;
}
