import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import LinkedListVisualizer from './LinkedListVisualizer';
import { createLinkedList } from './ListNode';
import StepCounter from './StepVisualization';


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
    let reversedArrows = new Set();
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
      pointers: { "slow , fast": 0 },
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

    let showForwardArrowArray = new Array(secondHalfOriginalValues.length).fill(true);

    function createReversalStep({ type, i, currentVal, nextVal, prevVal }) {
      const step = {
        id: stepCount++,
        list: head,
        list2: createLinkedList(secondHalfOriginalValues),
        pointers: {},
        pointers2: {},
        highlightNodes: [],
        highlightNodes2: [],
        reccurse: true,
        iteration: i + 1,
        reversalPhase: type
      };

      const arrowDirections = new Array(secondHalfOriginalValues.length).fill('normal');

      reversedArrows.forEach(index => {
      if (index < arrowDirections.length) {
          arrowDirections[index] = 'reverse';
        }
      });
      
      switch (type) {
        case 'Initialize':
          Object.assign(step, {
            description: `Initialize Pointers : Prev = null , Current = head, next = head.`,
            pointers2: { prev: null, "current, next" : i},
            highlightNodes2: [i],
            showArrow: [...showForwardArrowArray],
            arrowDirection : arrowDirections,
            code: `next = current.next;`,
            code2: `// Storing: next = ${nextVal || 'null'}`
          });
          break;

        case 'store_next':
          Object.assign(step, {
            description: `Iteration ${i + 1}a: Store next pointer before breaking the link.`,
            pointers2: { prev: i > 0 ? i - 1 : null, current: i, next: nextVal ? i + 1 : null, storing: true },
            highlightNodes2: [i, ...(nextVal ? [i + 1] : [])],
            showArrow: [...showForwardArrowArray],
            arrowDirection : arrowDirections,
            code: `next = current.next;`,
            code2: `// Storing: next = ${nextVal || 'null'}`
          });
          break;
        
        case 'break_link':
          showForwardArrowArray[i] = false;

          Object.assign(step, {
            description: `Iteration ${i + 1}b: Break the current link (remove arrow from ${currentVal}).`,
            pointers2: { prev: i > 0 ? i - 1 : null, current: i, next: nextVal ? i + 1 : null, breaking: true },
            highlightNodes2: [i],
            showArrow: [...showForwardArrowArray],
            arrowDirection: arrowDirections,
            code: `// About to break: current.next`,
            code2: `// Breaking link from ${currentVal} to ${nextVal || 'null'}`
          });
          break;
          
        case 'reverse_link':
          reversedArrows.add(i);
          arrowDirections[i] = 'reverse';
          showForwardArrowArray[i-1] = true;
          Object.assign(step, {
            description: `Iteration ${i + 1}b: Reverse link.`,
            pointers2: { prev: i > 0 ? i - 1 : null, current: i, next: nextVal ? i + 1 : null, reversing: true },
            highlightNodes2: [i, ...(prevVal ? [i - 1] : [])],
            showArrow: [...showForwardArrowArray],
            arrowDirection : arrowDirections,
            code: `current.next = prev;`,
            code2: `// Reversing: ${currentVal}.next = ${prevVal || 'null'}`
          });
          break; 

        case 'move_prev':
          Object.assign(step, {
            description: `Iteration ${i + 1}c: Move prev pointer forward.`,
            pointers2: { prev: i, current: i, next: nextVal ? i + 1 : null, movingPrev: true },
            highlightNodes2: [i],
            showArrow: [...showForwardArrowArray],
            arrowDirection : arrowDirections,
            code: `prev = current;`,
            code2: `// prev = ${currentVal}`
          }); 
          break;

        case 'move_current':
          Object.assign(step, {
            description: `Iteration ${i + 1}d: Move current pointer forward.`,
            pointers2: { prev: i, current: nextVal ? i + 1 : null, next: nextVal ? i + 1 : null, movingCurrent: true },
            showArrow: [...showForwardArrowArray],
            highlightNodes2: nextVal ? [i + 1] : [],
            arrowDirection : arrowDirections
          });
          break;
      }
      return step;
    }

    function createComparisonStep(i, val1, val2, reversedSecondListHead) {
      const isMatch = val1 === val2;
      return {
        id: stepCount++,
        description: `Compare node ${i + 1}: ${val1} ${isMatch ? '==' : '!='} ${val2}`,
        list: head,
        list2: reversedSecondListHead,
        pointers: { first: i },
        pointers2: { second: i },
        highlightNodes: [i],
        highlightNodes2: [i],
        code: `if (${val1} != ${val2}) return false;`,
        code2: `// Comparison ${i + 1}: ${val1} ${isMatch ? 'MATCH' : 'MISMATCH'}`,
        reccurse: true,
        comparisonResult: isMatch,
        comparisonIndex: i + 1
      };
    }

    if (secondHalfOriginalValues.length > 0) {
      steps.push(createReversalStep({ type: 'Initialize', i : 0, currentVal : secondHalfOriginalValues[0], nextVal : null, prevVal : null }));
      for (let i = 0; i < secondHalfOriginalValues.length; i++) {
        const currentVal = secondHalfOriginalValues[i];
        const nextVal = secondHalfOriginalValues[i + 1] || null;
        const prevVal = secondHalfOriginalValues[i - 1] || null;

        steps.push(createReversalStep({ type: 'store_next', i, currentVal, nextVal, prevVal }));
        steps.push(createReversalStep({ type: 'break_link', i, currentVal, nextVal, prevVal }));
        steps.push(createReversalStep({ type: 'reverse_link', i, currentVal, nextVal, prevVal }));
        steps.push(createReversalStep({ type: 'move_prev', i, currentVal, nextVal, prevVal }));
        steps.push(createReversalStep({ type: 'move_current', i, currentVal, nextVal, prevVal }));
      }
      
      const reversedSecondListHead = createLinkedList([...secondHalfOriginalValues].reverse());
      const reversedSecondHalfValues = [...secondHalfOriginalValues].reverse();

      for (let i = 0; i < firstHalfValues.length; i++) {
        const val1 = firstHalfValues[i];
        const val2 = reversedSecondHalfValues[i];
        const step = createComparisonStep(i, val1, val2, reversedSecondListHead);
        steps.push(step);
        if (!step.comparisonResult) break;
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
      reccurse: false,
      finalResult: palindromeResult,
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
    <div className="realtive min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <Link 
            to="/"
            className="absolute top-4 left-4 bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded transition duration-300"
          >
            &larr; Back to Algorithms
          </Link>
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

        <StepCounter
          currentStep={currentStep}
          steps={steps}
          currentStepData={currentStepData}
          isPalindrome={isPalindrome}
        />

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
                arrowDirection={currentStepData.arrowDirection}
                showArrow={currentStepData.showArrow}
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
