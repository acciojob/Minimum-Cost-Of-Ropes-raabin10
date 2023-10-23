function calculateMinCost() {
  // Get the input text and split it into an array of integers
  const inputText = document.getElementById("rope-lengths").value;
  const ropeLengths = inputText.split(",").map(Number);

  // Sort the rope lengths in ascending order
  ropeLengths.sort((a, b) => a - b);

  // Initialize the total cost to 0
  let totalCost = 0;

  // Iterate through the sorted rope lengths and merge them
  while (ropeLengths.length > 1) {
    // Take the two smallest ropes
    const smallest1 = ropeLengths.shift();
    const smallest2 = ropeLengths.shift();

    // Calculate the cost of merging the two ropes
    const cost = smallest1 + smallest2;

    // Add the cost to the total cost
    totalCost += cost;

    // Insert the merged rope back into the sorted array
    ropeLengths.push(cost);

    // Re-sort the array to maintain the order
    ropeLengths.sort((a, b) => a - b);
  }

  // Display the minimum cost in the result div
  const resultDiv = document.getElementById("result");
  resultDiv.textContent = totalCost;
}

// Attach the function to the form's submit event
const form = document.getElementById("form");
form.addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent the default form submission
  calculateMinCost(); // Calculate and display the minimum cost
});
