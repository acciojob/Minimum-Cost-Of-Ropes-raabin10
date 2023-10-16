function calculateMinCost() {
  const input = document.getElementById("ropesInput").value;
  const ropeLengths = input.split(",").map(Number);

  // Create a Min Heap to maintain the minimum lengths efficiently
  const minHeap = new MinHeap();

  // Insert all the rope lengths into the Min Heap
  for (const length of ropeLengths) {
    minHeap.insert(length);
  }

  let totalCost = 0;

  // Keep connecting the smallest two ropes until there's only one rope left
  while (minHeap.size() > 1) {
    const firstRope = minHeap.extractMin();
    const secondRope = minHeap.extractMin();
    const cost = firstRope + secondRope;
    totalCost += cost;
    minHeap.insert(cost);
  }

  const resultDiv = document.getElementById("result");
  resultDiv.innerText = `Minimum cost of connecting ropes: ${totalCost}`;
}

// Min Heap implementation
class MinHeap {
  constructor() {
    this.heap = [];
  }

  size() {
    return this.heap.length;
  }

  insert(value) {
    this.heap.push(value);
    this.bubbleUp();
  }

  extractMin() {
    if (this.size() === 0) {
      return null;
    }
    if (this.size() === 1) {
      return this.heap.pop();
    }

    const min = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.heapify(0);

    return min;
  }

  bubbleUp() {
    let index = this.size() - 1;
    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);
      if (this.heap[index] >= this.heap[parentIndex]) {
        break;
      }
      [this.heap[index], this.heap[parentIndex]] = [this.heap[parentIndex], this.heap[index]];
      index = parentIndex;
    }
  }

  heapify(index) {
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
      this.heapify(smallest);
    }
  }
}
