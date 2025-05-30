export class ListNode {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }
}

export const createLinkedList = (values) => {
  if (!values.length) return null;
  
  const head = new ListNode(values[0]);
  let current = head;
  
  for (let i = 1; i < values.length; i++) {
    current.next = new ListNode(values[i]);
    current = current.next;
  }
  
  return head;
};
