import {useRef} from 'react';

export class MinHeap {
  constructor() {
    this.heap = [];
  }

  // Insert a new node and keep the heap sorted
  insert(node) {
    if (!node) return;
    this.heap.push(node);
    this._heapifyUp();
  }

  // Remove and return the smallest node
  pop() {
    if (this.heap.length === 0) return null;
    if (this.heap.length === 1) return this.heap.pop();

    const top = this.heap[0];
    this.heap[0] = this.heap.pop();
    this._heapifyDown();
    return top;
  }

  // Peek at the smallest node
  peek() {
    return this.heap.length > 0 ? this.heap[0] : null;
  }

  // Return all values (for visualization)
  getHeap() {
    return [...this.heap];
  }

  // Internal: maintain heap order after insert
  _heapifyUp() {
    let index = this.heap.length - 1;
    while (index > 0) {
      let parent = Math.floor((index - 1) / 2);
      if (this.heap[parent].val <= this.heap[index].val) break;
      [this.heap[parent], this.heap[index]] = [this.heap[index], this.heap[parent]];
      index = parent;
    }
  }

  // Internal: maintain heap order after removal
  _heapifyDown() {
    let index = 0;
    const length = this.heap.length;
    while (true) {
      let smallest = index;
      let left = 2 * index + 1;
      let right = 2 * index + 2;

      if (left < length && this.heap[left].val < this.heap[smallest].val) {
        smallest = left;
      }
      if (right < length && this.heap[right].val < this.heap[smallest].val) {
        smallest = right;
      }
      if (smallest === index) break;
      [this.heap[smallest], this.heap[index]] = [this.heap[index], this.heap[smallest]];
      index = smallest;
    }
  }
}

export const createMinHeap = () => {
  return new MinHeap;
};