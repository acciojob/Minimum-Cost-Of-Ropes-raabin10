function calculateMinCost() {
  // Get the input text and split it into an array of integers
  const inputText = document.getElementById("rope-lengths").value;
  const ropeLengths = inputText.split(",").map(Number);

  // Create a min-heap (priority queue)
  const minHeap = new MinHeap();

  // Insert the rope lengths into the min-heap
  for (const length of ropeLengths) {
    minHeap.insert(length);
  }

  // Initialize the total cost to 0
  let totalCost = 0;

  // Continue merging ropes until there is only one rope left in the min-heap
  while (minHeap.size() > 1) {
    // Extract the two smallest ropes from the min-heap
    const rope1 = minHeap.extractMin();
    const rope2 = minHeap.extractMin();

    // Calculate the cost of merging the two ropes
    const cost = rope1 + rope2;

    // Add the cost to the total cost
    totalCost += cost;

    // Insert the merged rope back into the min-heap
    minHeap.insert(cost);
  }

  // Display the minimum cost in the result div
  const resultDiv = document.getElementById("result");
  resultDiv.textContent = totalCost;
}

// MinHeap class for priority queue operations
class MinHeap {
  constructor() {
    this.heap = [];
  }

  size() {
    return this.heap.length;
  }

  insert(value) {
    this.heap.push(value);
    this.bubbleUp(this.size() - 1);
  }

  extractMin() {
    if (this.size() === 0) {
      return null;
    }
    if (this.size() === 1) {
      return this.heap.pop();
    }
    const minValue = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.sinkDown(0);
    return minValue;
  }

  bubbleUp(index) {
    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);
      if (this.heap[index] < this.heap[parentIndex]) {
        [this.heap[index], this.heap[parentIndex]] = [this.heap[parentIndex], this.heap[index]];
        index = parentIndex;
      } else {
        break;
      }
    }
  }

  sinkDown(index) {
    const leftChildIndex = 2 * index + 1;
    const rightChildIndex = 2 * index + 2;
    let smallest = index;
    if (leftChildIndex < this.size() && this.heap[leftChildIndex] < this.heap[smallest]) {
      smallest = leftChildIndex;
    }
    if (rightChildIndex < this.size() && this.heap[rightChildIndex] < this.heap[smallest]) {
      smallest = rightChildIndex;
    }
    if (smallest !== index) {
      [this.heap[index], this.heap[smallest]] = [this.heap[smallest], this.heap[index]];
      this.sinkDown(smallest);
    }
  }
}
