function calculateMinCost() {
    // Fetching input value and converting it into an array of integers
    const inputString = document.getElementById("rope-lengths").value;
    const ropeLengths = inputString.split(",").map(Number);

    // Call the function to calculate the minimum cost
    const minCost = findMinCost(ropeLengths);

    // Display the result in the specified div
    document.getElementById("result").innerHTML = "Minimum Cost: " + minCost;
}

function findMinCost(ropeLengths) {
    // Check if the array has at least two ropes
    if (ropeLengths.length < 2) {
        return 0; // Cannot connect ropes if there is only one rope
    }

    // Initialize a min heap to efficiently find the smallest ropes
    const minHeap = new MinHeap(ropeLengths);

    let totalCost = 0;

    // Iterate until only one rope remains in the heap
    while (minHeap.size() > 1) {
        // Extract the two smallest ropes from the heap
        const first = minHeap.extractMin();
        const second = minHeap.extractMin();

        // Connect the ropes and add the cost to the total
        const currentCost = first + second;
        totalCost += currentCost;

        // Insert the connected rope back into the heap
        minHeap.insert(currentCost);
    }

    return totalCost;
}

class MinHeap {
    constructor(array) {
        this.heap = array;
        this.buildHeap();
    }

    buildHeap() {
        const lastNonLeafIndex = Math.floor(this.heap.length / 2) - 1;

        for (let i = lastNonLeafIndex; i >= 0; i--) {
            this.heapifyDown(i);
        }
    }

    heapifyDown(index) {
        const leftChildIndex = 2 * index + 1;
        const rightChildIndex = 2 * index + 2;
        let smallestIndex = index;

        if (leftChildIndex < this.heap.length && this.heap[leftChildIndex] < this.heap[smallestIndex]) {
            smallestIndex = leftChildIndex;
        }

        if (rightChildIndex < this.heap.length && this.heap[rightChildIndex] < this.heap[smallestIndex]) {
            smallestIndex = rightChildIndex;
        }

        if (index !== smallestIndex) {
            this.swap(index, smallestIndex);
            this.heapifyDown(smallestIndex);
        }
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
        this.heapifyDown(0);

        return min;
    }

    insert(value) {
        this.heap.push(value);
        this.heapifyUp(this.size() - 1);
    }

    heapifyUp(index) {
        while (index > 0) {
            const parentIndex = Math.floor((index - 1) / 2);

            if (this.heap[index] < this.heap[parentIndex]) {
                this.swap(index, parentIndex);
                index = parentIndex;
            } else {
                break;
            }
        }
    }

    swap(i, j) {
        const temp = this.heap[i];
        this.heap[i] = this.heap[j];
        this.heap[j] = temp;
    }

    size() {
        return this.heap.length;
    }
}
