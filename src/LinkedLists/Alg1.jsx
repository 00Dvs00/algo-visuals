import React, { useState, useEffect } from 'react';
import LinkedListVisualizer from './LinkedListVisualizer';
import { createLinkedList } from './ListNode';

const PalindromeOfAList = () => {
  const [inputValues, setInputValues] = useState('1,2,3,4,3,2,1');
  const [originalList, setOriginalList] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [steps, setSteps] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPalindrome, setIsPalindrome] = useState(true);

  const createVisualizationSteps = (head) => {
  const steps = [];
  let stepCount = 0;
  let values = [];

  let current = head;
  while (current) {
    values.push(current.val);
    current = current.next;
  }

  const listLength = values.length;
  let palindromeResult = true;
  
  if (listLength <= 1) {
    steps.push({
      id: stepCount++,
      description: `Initial linked list. List has 0 or 1 element, so it's a palindrome.`,
      list: head,
      pointers: {},
      highlightNodes: [],
      code: `boolean isPalindrome(ListNode head) {
    if (head == null || head.next == null) 
        return true;`,
      reccurse: false,
      finalResult: true
    });
    setIsPalindrome(true);
    return steps;
  }

  steps.push({
    id: stepCount++,
    description: "Initial linked list - checking if it's a palindrome",
    list: head,
    pointers: {},
    highlightNodes: [],
    code: `boolean isPalindrome(ListNode head) {
    if (head == null || head.next == null) 
        return true;`,
    reccurse: false
  });

  steps.push({
    id: stepCount++,
    description: "Initialize slow and fast pointers to find the middle",
    list: head,
    pointers: { "slow , fast": 0},
    highlightNodes: [0],
    code: `ListNode slow = head;
ListNode fast = head;`,
    reccurse: false
  });

  let middleMarkerIndex = 0;
  let fastPointerIndex = 0;
  while (fastPointerIndex < listLength && fastPointerIndex + 1 < listLength) {
    middleMarkerIndex++;
    fastPointerIndex += 2;

    steps.push({
      id: stepCount++,
      description: `Moving pointers: slow at index ${middleMarkerIndex}, fast at index ${Math.min(fastPointerIndex, listLength - 1)}`,
      list: head,
      pointers: { slow: middleMarkerIndex, fast: Math.min(fastPointerIndex, listLength - 1) },
      highlightNodes: [middleMarkerIndex, Math.min(fastPointerIndex, listLength - 1)],
      code: `while (fast != null && fast.next != null) {
    slow = slow.next;
    fast = fast.next.next;
}`,
      reccurse: false
    });
  }

  steps.push({ 
    id: stepCount++,
    description: `Middle identified. Node at index ${middleMarkerIndex} helps determine the split. Now reversing the second half.`,
    list: head,
    pointers: { middle: middleMarkerIndex },
    highlightNodes: [middleMarkerIndex],
    code: `// Middle found (slow pointer is at middle or start of second half).
// Now reverse the second half of the list.
ListNode secondHalfStartNode = (fast == null) ? slow : slow.next;
ListNode secondHalfReversed = reverseLinkedList(secondHalfStartNode);`,
    reccurse: false
  });

  let firstHalfValues;
  let secondHalfOriginalValues;

  if (listLength % 2 === 0) {
    firstHalfValues = values.slice(0, middleMarkerIndex);
    secondHalfOriginalValues = values.slice(middleMarkerIndex);
  } else {
    firstHalfValues = values.slice(0, middleMarkerIndex);
    secondHalfOriginalValues = values.slice(middleMarkerIndex + 1);
  }

  const reversedSecondHalfValues = [...secondHalfOriginalValues].reverse();

  if (secondHalfOriginalValues.length > 0) {
    const originalSecondListHead = createLinkedList(secondHalfOriginalValues);
    
    // **ENHANCEMENT 1: Initialize reversal pointers**
    steps.push({
      id: stepCount++,
      description: `Initialize reversal pointers: prev = null, current = first node of second half (${secondHalfOriginalValues[0]}), next = null`,
      list: head,
      list2: originalSecondListHead,
      pointers: {},
      pointers2: { 
        prev: null, 
        current: 0, 
        next: null 
      },
      highlightNodes: [],
      highlightNodes2: [0],
      code: `ListNode prev = null;
ListNode current = secondHalfStartNode;  // Points to ${secondHalfOriginalValues[0]}
ListNode next = null;`,
      code2: `// Initial state:
// prev: null (no previous node yet)
// current: ${secondHalfOriginalValues[0]} (starting node)
// next: null (will be set in loop)`,
      reccurse: true,
      reversalPhase: "initialization",
      arrowDirection: 'normal'
    });

    for (let i = 0; i < secondHalfOriginalValues.length; i++) {
      const currentVal = secondHalfOriginalValues[i];
      const nextVal = i < secondHalfOriginalValues.length - 1 ? secondHalfOriginalValues[i + 1] : null;
      const prevVal = i > 0 ? secondHalfOriginalValues[i - 1] : null;

      // **Phase A: Store next pointer**
      steps.push({
        id: stepCount++,
        description: `Iteration ${i + 1}a: Store next pointer before breaking the link. 
                     next = current.next (${nextVal || 'null'})`,
        list: head,
        list2: createLinkedList(secondHalfOriginalValues),
        pointers: {},
        pointers2: { 
          prev: i > 0 ? i - 1 : null, 
          current: i, 
          next: i < secondHalfOriginalValues.length - 1 ? i + 1 : null,
          storing: true
        },
        highlightNodes: [],
        highlightNodes2: [i, ...(nextVal !== null ? [i + 1] : [])],
        code: `while (current != null) {
    next = current.next;  // ← Currently executing this line`,
        code2: `// Storing: next = ${nextVal || 'null'}
// This preserves the original link before we break it
// current (${currentVal}) → next (${nextVal || 'null'})
// Without this step, we'd lose the rest of the list!`,
        reccurse: true,
        reversalPhase: "store_next",
        iteration: i + 1,
        arrowDirection: 'normal',
        animationType: 'pointer_store'
      });

      // **Phase B: Reverse the current link**
      steps.push({
        id: stepCount++,
        description: `Iteration ${i + 1}b: Reverse the link direction. 
                     current.next = prev (${prevVal || 'null'})`,
        list: head,
        list2: createLinkedList(secondHalfOriginalValues),
        pointers: {},
        pointers2: { 
          prev: i > 0 ? i - 1 : null, 
          current: i, 
          next: i < secondHalfOriginalValues.length - 1 ? i + 1 : null,
          reversing: true
        },
        highlightNodes: [],
        highlightNodes2: [i, ...(prevVal !== null ? [i - 1] : [])],
        code: `    current.next = prev;  // ← Currently executing this line`,
        code2: `// Reversing: ${currentVal}.next = ${prevVal || 'null'}
// OLD LINK: ${currentVal} → ${nextVal || 'null'} (BROKEN)
// NEW LINK: ${currentVal} → ${prevVal || 'null'} (CREATED)
// The arrow direction is now flipped!`,
        reccurse: true,
        reversalPhase: "reverse_link",
        iteration: i + 1,
        linkChange: {
          from: nextVal,
          to: prevVal,
          node: currentVal
        },
        arrowDirection: 'reverse',
        animationType: 'link_reversal',
        highlightType: 'critical'
      });

      // **Phase C: Move prev pointer**
      steps.push({
        id: stepCount++,
        description: `Iteration ${i + 1}c: Move prev pointer forward. 
                     prev = current (${currentVal})`,
        list: head,
        list2: createLinkedList(secondHalfOriginalValues),
        pointers: {},
        pointers2: { 
          prev: i, 
          current: i, 
          next: i < secondHalfOriginalValues.length - 1 ? i + 1 : null,
          movingPrev: true
        },
        highlightNodes: [],
        highlightNodes2: [i],
        code: `    prev = current;       // ← Currently executing this line`,
        code2: `// Moving prev pointer:
// OLD prev: ${prevVal || 'null'}
// NEW prev: ${currentVal}
// prev now tracks the last processed (reversed) node
// This becomes the "previous" for the next iteration`,
        reccurse: true,
        reversalPhase: "move_prev",
        iteration: i + 1,
        animationType: 'pointer_move',
        pointerMovement: {
          pointer: 'prev',
          from: prevVal,
          to: currentVal
        }
      });

      // **Phase D: Move current pointer**
      steps.push({
        id: stepCount++,
        description: `Iteration ${i + 1}d: Move current pointer forward. 
                     current = next (${nextVal || 'null'})`,
        list: head,
        list2: createLinkedList(secondHalfOriginalValues),
        pointers: {},
        pointers2: { 
          prev: i, 
          current: i < secondHalfOriginalValues.length - 1 ? i + 1 : null, 
          next: i < secondHalfOriginalValues.length - 1 ? i + 1 : null,
          movingCurrent: true
        },
        highlightNodes: [],
        highlightNodes2: nextVal !== null ? [i + 1] : [],
        code: `    current = next;       // ← Currently executing this line
}`,
        code2: `// Moving current pointer:
// OLD current: ${currentVal}
// NEW current: ${nextVal || 'null'}
${nextVal ? '// Ready for next iteration' : '// current is null, loop will end'}
// We use the stored 'next' to advance safely`,
        reccurse: true,
        reversalPhase: "move_current",
        iteration: i + 1,
        loopWillEnd: nextVal === null,
        animationType: 'pointer_move',
        pointerMovement: {
          pointer: 'current',
          from: currentVal,
          to: nextVal
        }
      });

      // **ENHANCEMENT 3: Progressive state visualization**
      let progressiveReversedValues = [...secondHalfOriginalValues];
      steps.push({
        id: stepCount++,
        description: `End of iteration ${i + 1}: Links reversed up to node ${currentVal}. 
                     Progress: ${i + 1}/${secondHalfOriginalValues.length} nodes processed.
                     ${nextVal ? 'Continuing to next node...' : 'Reversal complete!'}`,
        list: head,
        list2: createLinkedList(progressiveReversedValues),
        pointers: {},
        pointers2: { 
          prev: i, 
          current: nextVal !== null ? i + 1 : null,
          reversedUpTo: i,
          progress: i + 1
        },
        highlightNodes: [],
        highlightNodes2: Array.from({length: i + 1}, (_, idx) => idx),
        code: `// State after iteration ${i + 1}:
// Nodes 0 to ${i} have been reversed
// prev points to: ${currentVal} (new head so far)
// Progress: ${Math.round(((i + 1) / secondHalfOriginalValues.length) * 100)}% complete`,
        code2: `// REVERSED PORTION: [${secondHalfOriginalValues.slice(0, i + 1).reverse().join(' ← ')}]
// REMAINING ORIGINAL: [${nextVal ? secondHalfOriginalValues.slice(i + 1).join(' → ') : 'none'}]
${nextVal ? '// Continue processing remaining nodes...' : '// All nodes successfully reversed!'}`,
        reccurse: true,
        reversalPhase: "iteration_complete",
        iteration: i + 1,
        progressPercentage: Math.round(((i + 1) / secondHalfOriginalValues.length) * 100),
        partiallyReversed: true,
        arrowDirection: 'mixed'
      });
    }

    // **ENHANCEMENT 4: Final reversal result with comprehensive summary**
    const reversedSecondListHead = createLinkedList(reversedSecondHalfValues);
    
    steps.push({
      id: stepCount++,
      description: `Reversal algorithm complete! 
                   Original second half: [${secondHalfOriginalValues.join(' → ')}] 
                   Reversed second half: [${reversedSecondHalfValues.join(' ← ')}]
                   prev now points to ${reversedSecondHalfValues[0]} (new head of reversed list)`,
      list: head,
      list2: reversedSecondListHead,
      pointers: {},
      pointers2: { 
        newHead: 0,
        prev: 0,
        finalState: true
      },
      highlightNodes: [],
      highlightNodes2: [0],
      code: `// Final state after reversal:
// prev = ${reversedSecondHalfValues[0]} (new head)
// current = null (reached end of original list)
// All ${secondHalfOriginalValues.length} links successfully reversed`,
      code2: `// TRANSFORMATION COMPLETE:
// Before: ${secondHalfOriginalValues.join(' → ')}
// After:  ${reversedSecondHalfValues.join(' ← ')}
// Ready for palindrome comparison phase`,
      reccurse: true,
      reversalPhase: "complete",
      arrowDirection: 'reverse',
      transformationSummary: {
        original: secondHalfOriginalValues,
        reversed: reversedSecondHalfValues,
        nodeCount: secondHalfOriginalValues.length
      }
    });

    // **ENHANCEMENT 5: Detailed comparison with enhanced feedback**
    if (firstHalfValues.length !== reversedSecondHalfValues.length) {
      palindromeResult = false;
      steps.push({
        id: stepCount++,
        description: `Length mismatch detected! First half has ${firstHalfValues.length} nodes, reversed second half has ${reversedSecondHalfValues.length} nodes. Not a palindrome.`,
        list: head,
        list2: reversedSecondListHead,
        pointers: {},
        pointers2: {},
        highlightNodes: [],
        highlightNodes2: [],
        code: `// Length check failed:
// First half length: ${firstHalfValues.length}
// Second half length: ${reversedSecondHalfValues.length}
return false;`,
        reccurse: true,
        comparisonResult: false,
        mismatchType: 'length'
      });
    } else {
      for (let i = 0; i < firstHalfValues.length; i++) {
        const isMatch = firstHalfValues[i] === reversedSecondHalfValues[i];
        if (!isMatch) {
          palindromeResult = false;
        }

        steps.push({
          id: stepCount++,
          description: `Comparison ${i + 1}/${firstHalfValues.length}: Comparing first half value ${firstHalfValues[i]} with reversed second half value ${reversedSecondHalfValues[i]}
                       Result: ${isMatch ? 'MATCH' : 'MISMATCH'}
                       ${isMatch ? 'Continue checking...' : 'Palindrome check failed!'}`,
          list: head,
          list2: reversedSecondListHead,
          pointers: { first: i },
          pointers2: { second: i },
          highlightNodes: [i],
          highlightNodes2: [i],
          code: `while (head1 != null && head2 != null) {
    if (head1.val != head2.val) {
        return false; // Mismatch found
    }
    head1 = head1.next;
    head2 = head2.next;
}`,
          code2: `// Comparison ${i + 1}: ${firstHalfValues[i]} ${isMatch ? '==' : '!='} ${reversedSecondHalfValues[i]}
// Result: ${isMatch ? 'MATCH ' : 'MISMATCH'}
// Progress: ${i + 1}/${firstHalfValues.length} comparisons
${!isMatch ? '// EARLY TERMINATION: Palindrome = false' : ''}`,
          reccurse: true,
          comparisonResult: isMatch,
          comparisonIndex: i + 1,
          totalComparisons: firstHalfValues.length,
          values: {
            first: firstHalfValues[i],
            second: reversedSecondHalfValues[i]
          }
        });

        if (!isMatch) break;
      }
    }
  }

  // **ENHANCEMENT 6: Comprehensive final result**
  steps.push({
    id: stepCount++,
    description: `Algorithm complete! 
                 Final result: List is ${palindromeResult ? 'PALINDROME' : 'NOT a palindrome'}
                 ${palindromeResult ? 'All comparisons matched!' : 'Mismatch found during comparison.'}`,
    list: head,
    pointers: {},
    highlightNodes: [],
    code: `// (Optional: Restore original list by reversing second half again)
// Time Complexity: O(n) - single pass through list
// Space Complexity: O(1) - constant extra space
return ${palindromeResult};`,
    code2: `// FINAL ANALYSIS:
// Original list: [${values.join(', ')}]
// First half: [${firstHalfValues.join(', ')}]
// Second half: [${secondHalfOriginalValues.join(', ')}]
// Palindrome: ${palindromeResult ? 'TRUE ' : 'FALSE '}`,
    reccurse: false,
    finalResult: palindromeResult,
    algorithmSummary: {
      originalList: values,
      firstHalf: firstHalfValues,
      secondHalf: secondHalfOriginalValues,
      isPalindrome: palindromeResult,
      totalSteps: stepCount
    }
  });

  setIsPalindrome(palindromeResult);
  return steps;
};

  const handleCreateList = () => {
    const values = inputValues.split(',').map(v => parseInt(v.trim())).filter(v => !isNaN(v));
    const head = createLinkedList(values);
    setOriginalList(head);
    setSteps(createVisualizationSteps(head));
    setCurrentStep(0);
    setIsPlaying(false);
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const playAnimation = () => {
    setIsPlaying(true);
    const interval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev >= steps.length - 1) {
          setIsPlaying(false);
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, 2000);
  };

  useEffect(() => {
    handleCreateList();
  }, []);

  const currentStepData = steps[currentStep] || {};

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Palindrome Linked List Visualizer
          </h1>
          <p className="text-lg text-gray-600">
            Watch how the algorithm determines if a linked list is a palindrome
          </p>
        </div>

        {/* Controls Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex flex-wrap items-center gap-4 justify-center">
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-gray-700">
                Input Values:
              </label>
              <input
                type="text"
                value={inputValues}
                onChange={(e) => setInputValues(e.target.value)}
                placeholder="Enter comma-separated values"
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 w-64"
              />
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleCreateList}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
              >
                Create List
              </button>

              <button
                onClick={prevStep}
                disabled={currentStep === 0}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200 font-medium"
              >
                Previous
              </button>

              <button
                onClick={nextStep}
                disabled={currentStep >= steps.length - 1}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200 font-medium"
              >
                Next
              </button>

              <button
                onClick={playAnimation}
                disabled={isPlaying}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-green-300 disabled:cursor-not-allowed transition-colors duration-200 font-medium"
              >
                {isPlaying ? 'Playing...' : 'Play Animation'}
              </button>
            </div>
          </div>
        </div>

        {/* Step Information */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-2xl font-semibold text-gray-800">
              Step {currentStep + 1} of {steps.length}
            </h3>
            <div className="flex items-center gap-2">
              <div className="w-32 bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                ></div>
              </div>
              <span className="text-sm text-gray-600">
                {Math.round(((currentStep + 1) / steps.length) * 100)}%
              </span>
            </div>
          </div>

          <p className="text-lg text-gray-700 mb-4">
            {currentStepData.description}
          </p>

          {currentStepData.description2 && (
            <p className="text-lg text-gray-700 mb-4">
              {currentStepData.description2}
            </p>
          )}

          {currentStepData.finalResult !== undefined && (
            <div className={`inline-flex items-center px-4 py-2 rounded-lg font-semibold ${isPalindrome
              ? 'bg-green-100 text-green-800 border border-green-200'
              : 'bg-red-100 text-red-800 border border-red-200'
              }`}>
              Result: {isPalindrome ? 'PALINDROME' : 'NOT A PALINDROME'}
            </div>
          )}
        </div>

        {/* Visualization Area */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h4 className="text-xl font-semibold text-gray-800 mb-4">
            Linked List Visualization
          </h4>

          {currentStepData.reccurse ? (
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-blue-50 rounded-lg p-4">
                <h5 className="text-lg font-medium text-blue-800 mb-3">
                  Original List
                </h5>
                <LinkedListVisualizer
                  list={currentStepData.list}
                  highlightNodes={currentStepData.highlightNodes}
                  pointers={currentStepData.pointers}
                />
              </div>

              <div className="bg-green-50 rounded-lg p-4">
                <h5 className="text-lg font-medium text-green-800 mb-3">
                  Reversing Second Half
                </h5>
                <LinkedListVisualizer
                  list={currentStepData.list2}
                  highlightNodes={currentStepData.highlightNodes2}
                  pointers={currentStepData.pointers2}
                />
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 rounded-lg p-4">
              <LinkedListVisualizer
                list={currentStepData.list}
                highlightNodes={currentStepData.highlightNodes}
                pointers={currentStepData.pointers}
              />
            </div>
          )}
        </div>

        {/* Code Display */}
        {/* <div className="bg-white rounded-xl shadow-lg p-6">
          <h4 className="text-xl font-semibold text-gray-800 mb-4">
            Current Code Execution
          </h4>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-gray-900 rounded-lg p-4">
              <h5 className="text-sm font-medium text-gray-300 mb-2">
                Primary Code
              </h5>
              <pre className="text-green-400 text-sm overflow-x-auto whitespace-pre-wrap">
                <code>{currentStepData.code}</code>
              </pre>
            </div>
            
            {currentStepData.code2 && (
              <div className="bg-gray-900 rounded-lg p-4">
                <h5 className="text-sm font-medium text-gray-300 mb-2">
                  Secondary Code
                </h5>
                <pre className="text-blue-400 text-sm overflow-x-auto whitespace-pre-wrap">
                  <code>{currentStepData.code2}</code>
                </pre>
              </div>
            )}
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default PalindromeOfAList;
