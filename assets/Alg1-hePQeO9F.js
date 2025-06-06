import{r as N,j as t}from"./index-CqdjG8VS.js";import{L,c as m}from"./ListNode-C7yJ5Xe8.js";const B=()=>{const[S,C]=N.useState("1,2,3,4,3,2,1"),[F,k]=N.useState(null),[u,$]=N.useState(0),[f,A]=N.useState([]),[R,y]=N.useState(!1),[I,P]=N.useState(!0),E=r=>{const s=[];let l=0,p=[],w=r;for(;w;)p.push(w.val),w=w.next;const x=p.length;let g=!0;if(x<=1)return s.push({id:l++,description:"Initial linked list. List has 0 or 1 element, so it's a palindrome.",list:r,pointers:{},highlightNodes:[],code:`boolean isPalindrome(ListNode head) {
    if (head == null || head.next == null) 
        return true;`,reccurse:!1,finalResult:!0}),P(!0),s;s.push({id:l++,description:"Initial linked list - checking if it's a palindrome",list:r,pointers:{},highlightNodes:[],code:`boolean isPalindrome(ListNode head) {
    if (head == null || head.next == null) 
        return true;`,reccurse:!1}),s.push({id:l++,description:"Initialize slow and fast pointers to find the middle",list:r,pointers:{"slow , fast":0},highlightNodes:[0],code:`ListNode slow = head;
ListNode fast = head;`,reccurse:!1});let h=0,b=0;for(;b<x&&b+1<x;)h++,b+=2,s.push({id:l++,description:`Moving pointers: slow at index ${h}, fast at index ${Math.min(b,x-1)}`,list:r,pointers:{slow:h,fast:Math.min(b,x-1)},highlightNodes:[h,Math.min(b,x-1)],code:`while (fast != null && fast.next != null) {
    slow = slow.next;
    fast = fast.next.next;
}`,reccurse:!1});s.push({id:l++,description:`Middle identified. Node at index ${h} helps determine the split. Now reversing the second half.`,list:r,pointers:{middle:h},highlightNodes:[h],code:`// Middle found (slow pointer is at middle or start of second half).
// Now reverse the second half of the list.
ListNode secondHalfStartNode = (fast == null) ? slow : slow.next;
ListNode secondHalfReversed = reverseLinkedList(secondHalfStartNode);`,reccurse:!1});let a,i;x%2===0?(a=p.slice(0,h),i=p.slice(h)):(a=p.slice(0,h),i=p.slice(h+1));const c=[...i].reverse();if(i.length>0){const V=m(i);s.push({id:l++,description:`Initialize reversal pointers: prev = null, current = first node of second half (${i[0]}), next = null`,list:r,list2:V,pointers:{},pointers2:{prev:null,current:0,next:null},highlightNodes:[],highlightNodes2:[0],code:`ListNode prev = null;
ListNode current = secondHalfStartNode;  // Points to ${i[0]}
ListNode next = null;`,code2:`// Initial state:
// prev: null (no previous node yet)
// current: ${i[0]} (starting node)
// next: null (will be set in loop)`,reccurse:!0,reversalPhase:"initialization",arrowDirection:"normal"});for(let e=0;e<i.length;e++){const n=i[e],o=e<i.length-1?i[e+1]:null,v=e>0?i[e-1]:null;s.push({id:l++,description:`Iteration ${e+1}a: Store next pointer before breaking the link. 
                     next = current.next (${o||"null"})`,list:r,list2:m(i),pointers:{},pointers2:{prev:e>0?e-1:null,current:e,next:e<i.length-1?e+1:null,storing:!0},highlightNodes:[],highlightNodes2:[e,...o!==null?[e+1]:[]],code:`while (current != null) {
    next = current.next;  // ← Currently executing this line`,code2:`// Storing: next = ${o||"null"}
// This preserves the original link before we break it
// current (${n}) → next (${o||"null"})
// Without this step, we'd lose the rest of the list!`,reccurse:!0,reversalPhase:"store_next",iteration:e+1,arrowDirection:"normal",animationType:"pointer_store"}),s.push({id:l++,description:`Iteration ${e+1}b: Reverse the link direction. 
                     current.next = prev (${v||"null"})`,list:r,list2:m(i),pointers:{},pointers2:{prev:e>0?e-1:null,current:e,next:e<i.length-1?e+1:null,reversing:!0},highlightNodes:[],highlightNodes2:[e,...v!==null?[e-1]:[]],code:"    current.next = prev;  // ← Currently executing this line",code2:`// Reversing: ${n}.next = ${v||"null"}
// OLD LINK: ${n} → ${o||"null"} (BROKEN)
// NEW LINK: ${n} → ${v||"null"} (CREATED)
// The arrow direction is now flipped!`,reccurse:!0,reversalPhase:"reverse_link",iteration:e+1,linkChange:{from:o,to:v,node:n},arrowDirection:"reverse",animationType:"link_reversal",highlightType:"critical"}),s.push({id:l++,description:`Iteration ${e+1}c: Move prev pointer forward. 
                     prev = current (${n})`,list:r,list2:m(i),pointers:{},pointers2:{prev:e,current:e,next:e<i.length-1?e+1:null,movingPrev:!0},highlightNodes:[],highlightNodes2:[e],code:"    prev = current;       // ← Currently executing this line",code2:`// Moving prev pointer:
// OLD prev: ${v||"null"}
// NEW prev: ${n}
// prev now tracks the last processed (reversed) node
// This becomes the "previous" for the next iteration`,reccurse:!0,reversalPhase:"move_prev",iteration:e+1,animationType:"pointer_move",pointerMovement:{pointer:"prev",from:v,to:n}}),s.push({id:l++,description:`Iteration ${e+1}d: Move current pointer forward. 
                     current = next (${o||"null"})`,list:r,list2:m(i),pointers:{},pointers2:{prev:e,current:e<i.length-1?e+1:null,next:e<i.length-1?e+1:null,movingCurrent:!0},highlightNodes:[],highlightNodes2:o!==null?[e+1]:[],code:`    current = next;       // ← Currently executing this line
}`,code2:`// Moving current pointer:
// OLD current: ${n}
// NEW current: ${o||"null"}
${o?"// Ready for next iteration":"// current is null, loop will end"}
// We use the stored 'next' to advance safely`,reccurse:!0,reversalPhase:"move_current",iteration:e+1,loopWillEnd:o===null,animationType:"pointer_move",pointerMovement:{pointer:"current",from:n,to:o}});let D=[...i];s.push({id:l++,description:`End of iteration ${e+1}: Links reversed up to node ${n}. 
                     Progress: ${e+1}/${i.length} nodes processed.
                     ${o?"Continuing to next node...":"Reversal complete!"}`,list:r,list2:m(D),pointers:{},pointers2:{prev:e,current:o!==null?e+1:null,reversedUpTo:e,progress:e+1},highlightNodes:[],highlightNodes2:Array.from({length:e+1},(z,_)=>_),code:`// State after iteration ${e+1}:
// Nodes 0 to ${e} have been reversed
// prev points to: ${n} (new head so far)
// Progress: ${Math.round((e+1)/i.length*100)}% complete`,code2:`// REVERSED PORTION: [${i.slice(0,e+1).reverse().join(" ← ")}]
// REMAINING ORIGINAL: [${o?i.slice(e+1).join(" → "):"none"}]
${o?"// Continue processing remaining nodes...":"// All nodes successfully reversed!"}`,reccurse:!0,reversalPhase:"iteration_complete",iteration:e+1,progressPercentage:Math.round((e+1)/i.length*100),partiallyReversed:!0,arrowDirection:"mixed"})}const j=m(c);if(s.push({id:l++,description:`Reversal algorithm complete! 
                   Original second half: [${i.join(" → ")}] 
                   Reversed second half: [${c.join(" ← ")}]
                   prev now points to ${c[0]} (new head of reversed list)`,list:r,list2:j,pointers:{},pointers2:{newHead:0,prev:0,finalState:!0},highlightNodes:[],highlightNodes2:[0],code:`// Final state after reversal:
// prev = ${c[0]} (new head)
// current = null (reached end of original list)
// All ${i.length} links successfully reversed`,code2:`// TRANSFORMATION COMPLETE:
// Before: ${i.join(" → ")}
// After:  ${c.join(" ← ")}
// Ready for palindrome comparison phase`,reccurse:!0,reversalPhase:"complete",arrowDirection:"reverse",transformationSummary:{original:i,reversed:c,nodeCount:i.length}}),a.length!==c.length)g=!1,s.push({id:l++,description:`Length mismatch detected! First half has ${a.length} nodes, reversed second half has ${c.length} nodes. Not a palindrome.`,list:r,list2:j,pointers:{},pointers2:{},highlightNodes:[],highlightNodes2:[],code:`// Length check failed:
// First half length: ${a.length}
// Second half length: ${c.length}
return false;`,reccurse:!0,comparisonResult:!1,mismatchType:"length"});else for(let e=0;e<a.length;e++){const n=a[e]===c[e];if(n||(g=!1),s.push({id:l++,description:`Comparison ${e+1}/${a.length}: Comparing first half value ${a[e]} with reversed second half value ${c[e]}
                       Result: ${n?"MATCH":"MISMATCH"}
                       ${n?"Continue checking...":"Palindrome check failed!"}`,list:r,list2:j,pointers:{first:e},pointers2:{second:e},highlightNodes:[e],highlightNodes2:[e],code:`while (head1 != null && head2 != null) {
    if (head1.val != head2.val) {
        return false; // Mismatch found
    }
    head1 = head1.next;
    head2 = head2.next;
}`,code2:`// Comparison ${e+1}: ${a[e]} ${n?"==":"!="} ${c[e]}
// Result: ${n?"MATCH ":"MISMATCH"}
// Progress: ${e+1}/${a.length} comparisons
${n?"":"// EARLY TERMINATION: Palindrome = false"}`,reccurse:!0,comparisonResult:n,comparisonIndex:e+1,totalComparisons:a.length,values:{first:a[e],second:c[e]}}),!n)break}}return s.push({id:l++,description:`Algorithm complete! 
                 Final result: List is ${g?"PALINDROME":"NOT a palindrome"}
                 ${g?"All comparisons matched!":"Mismatch found during comparison."}`,list:r,pointers:{},highlightNodes:[],code:`// (Optional: Restore original list by reversing second half again)
// Time Complexity: O(n) - single pass through list
// Space Complexity: O(1) - constant extra space
return ${g};`,code2:`// FINAL ANALYSIS:
// Original list: [${p.join(", ")}]
// First half: [${a.join(", ")}]
// Second half: [${i.join(", ")}]
// Palindrome: ${g?"TRUE ":"FALSE "}`,reccurse:!1,finalResult:g,algorithmSummary:{originalList:p,firstHalf:a,secondHalf:i,isPalindrome:g,totalSteps:l}}),P(g),s},M=()=>{const r=S.split(",").map(l=>parseInt(l.trim())).filter(l=>!isNaN(l)),s=m(r);k(s),A(E(s)),$(0),y(!1)},O=()=>{u<f.length-1&&$(u+1)},T=()=>{u>0&&$(u-1)},H=()=>{y(!0);const r=setInterval(()=>{$(s=>s>=f.length-1?(y(!1),clearInterval(r),s):s+1)},2e3)};N.useEffect(()=>{M()},[]);const d=f[u]||{};return t.jsx("div",{className:"min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6",children:t.jsxs("div",{className:"max-w-7xl mx-auto",children:[t.jsxs("div",{className:"text-center mb-8",children:[t.jsx("h1",{className:"text-4xl font-bold text-gray-800 mb-2",children:"Palindrome Linked List Visualizer"}),t.jsx("p",{className:"text-lg text-gray-600",children:"Watch how the algorithm determines if a linked list is a palindrome"})]}),t.jsx("div",{className:"bg-white rounded-xl shadow-lg p-6 mb-6",children:t.jsxs("div",{className:"flex flex-wrap items-center gap-4 justify-center",children:[t.jsxs("div",{className:"flex items-center gap-2",children:[t.jsx("label",{className:"text-sm font-medium text-gray-700",children:"Input Values:"}),t.jsx("input",{type:"text",value:S,onChange:r=>C(r.target.value),placeholder:"Enter comma-separated values",className:"px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 w-64"})]}),t.jsxs("div",{className:"flex gap-2",children:[t.jsx("button",{onClick:M,className:"px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium",children:"Create List"}),t.jsx("button",{onClick:T,disabled:u===0,className:"px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200 font-medium",children:"Previous"}),t.jsx("button",{onClick:O,disabled:u>=f.length-1,className:"px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200 font-medium",children:"Next"}),t.jsx("button",{onClick:H,disabled:R,className:"px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-green-300 disabled:cursor-not-allowed transition-colors duration-200 font-medium",children:R?"Playing...":"Play Animation"})]})]})}),t.jsxs("div",{className:"bg-white rounded-xl shadow-lg p-6 mb-6",children:[t.jsxs("div",{className:"flex items-center justify-between mb-4",children:[t.jsxs("h3",{className:"text-2xl font-semibold text-gray-800",children:["Step ",u+1," of ",f.length]}),t.jsxs("div",{className:"flex items-center gap-2",children:[t.jsx("div",{className:"w-32 bg-gray-200 rounded-full h-2",children:t.jsx("div",{className:"bg-blue-600 h-2 rounded-full transition-all duration-300",style:{width:`${(u+1)/f.length*100}%`}})}),t.jsxs("span",{className:"text-sm text-gray-600",children:[Math.round((u+1)/f.length*100),"%"]})]})]}),t.jsx("p",{className:"text-lg text-gray-700 mb-4",children:d.description}),d.description2&&t.jsx("p",{className:"text-lg text-gray-700 mb-4",children:d.description2}),d.finalResult!==void 0&&t.jsxs("div",{className:`inline-flex items-center px-4 py-2 rounded-lg font-semibold ${I?"bg-green-100 text-green-800 border border-green-200":"bg-red-100 text-red-800 border border-red-200"}`,children:["Result: ",I?"PALINDROME":"NOT A PALINDROME"]})]}),t.jsxs("div",{className:"bg-white rounded-xl shadow-lg p-6 mb-6",children:[t.jsx("h4",{className:"text-xl font-semibold text-gray-800 mb-4",children:"Linked List Visualization"}),d.reccurse?t.jsxs("div",{className:"grid md:grid-cols-2 gap-6",children:[t.jsxs("div",{className:"bg-blue-50 rounded-lg p-4",children:[t.jsx("h5",{className:"text-lg font-medium text-blue-800 mb-3",children:"Original List"}),t.jsx(L,{list:d.list,highlightNodes:d.highlightNodes,pointers:d.pointers})]}),t.jsxs("div",{className:"bg-green-50 rounded-lg p-4",children:[t.jsx("h5",{className:"text-lg font-medium text-green-800 mb-3",children:"Reversing Second Half"}),t.jsx(L,{list:d.list2,highlightNodes:d.highlightNodes2,pointers:d.pointers2})]})]}):t.jsx("div",{className:"bg-gray-50 rounded-lg p-4",children:t.jsx(L,{list:d.list,highlightNodes:d.highlightNodes,pointers:d.pointers})})]})]})})};export{B as default};
