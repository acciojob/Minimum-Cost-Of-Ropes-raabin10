function calculateMinCost() {
 const ropeLengths = document.getElementById('rope-lengths').value.split(',').map(Number);
 const minHeap = new MinHeap();
  
 ropeLengths.forEach(length => {
    minHeap.insert(length);
 });
  
 let totalCost = 0;
 while (minHeap.size > 1) {
    const rope1 = minHeap.extractMin();
    const rope2 = minHeap.extractMin();
    totalCost += rope1 + rope2;
    minHeap.insert(rope1 + rope2);
 }
  
 document.getElementById('result').innerText = totalCost;
}

class MinHeap {
 constructor() {
    this.heap = [];
 }
  
 size() {
    return this.heap.length;
 }
  
 insert(value) {
    this.heap.push(value);
    this.bubbleUp(this.heap.length - 1);
 }
  
 extractMin() {
    const min = this.heap[0];
    this.heap[0] = this.heap[this.heap.length - 1];
    this.heap.pop();
    this.bubbleDown(0);
    return min;
 }
  
 bubbleUp(index) {
    if (index === 0) return;
    const parentIndex = Math.floor((index - 1) / 2);
    if (this.heap[index] < this.heap[parentIndex]) {
      [this.heap[index], this.heap[parentIndex]] = [this.heap[parentIndex], this.heap[index]];
      this.bubbleUp(parentIndex);
    }
 }
  
 bubbleDown(index) {
    const leftChildIndex = 2 * index + 1;
    const rightChildIndex = 2 * index + 2;
    let smallestIndex = index;
    if (leftChildIndex < this.heap.length && this.heap[leftChildIndex] < this.heap[smallestIndex]) {
      smallestIndex = leftChildIndex;
    }
    if (rightChildIndex < this.heap.length && this.heap[rightChildIndex] < this.heap[smallestIndex]) {
      smallestIndex = rightChildIndex;
    }
    if (smallestIndex !== index) {
      [this.heap[index], this.heap[smallestIndex]] = [this.heap[smallestIndex], this.heap[index]];
      this.bubbleDown(smallestIndex);
    }
 }
}