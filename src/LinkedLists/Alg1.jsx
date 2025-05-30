import React, { useState, useEffect } from 'react';
import LinkedListVisualizer from './LinkedListVisualizer';
import { createLinkedList } from './ListNode';

const PalindromeOfAList = () => {
  const [inputValues, setInputValues] = useState('1,2,3,2,1');
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
      pointers: { slow: 0, fast: 0 },
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
ListNode secondHalfStartNode = (fast == null) ? slow : slow.next; // Adjust based on actual list nodes
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
      const reversedSecondListHead = createLinkedList(reversedSecondHalfValues);

      steps.push({
        id: stepCount++,
        description: "Second half (values: " + secondHalfOriginalValues.join(',') + ") reversed to: " + reversedSecondHalfValues.join(','),
        list: head,
        list2: reversedSecondListHead,
        pointers: { firstHalf: 0 },
        pointers2: { secondHalf: 0 },
        highlightNodes: [0],
        highlightNodes2: [0],
        code: `ListNode prev = null;
ListNode current = secondHalfStartNode; // Assuming secondHalfStartNode is head of second half
while (current != null) {
    ListNode nextTemp = current.next;
    current.next = prev;
    prev = current;
    current = nextTemp;
}
// prev is now head of reversed second half`,
        code2: `// Reversed second half created: ${reversedSecondHalfValues.join(',')}`,
        reccurse: true
      });

      if (firstHalfValues.length !== reversedSecondHalfValues.length) {
        palindromeResult = false;
      } else {
        for (let i = 0; i < firstHalfValues.length; i++) {
          const isMatch = firstHalfValues[i] === reversedSecondHalfValues[i];
          if (!isMatch) {
            palindromeResult = false;
          }

          steps.push({
            id: stepCount++,
            description: `Comparing (first half value) ${firstHalfValues[i]} with (reversed second half value) ${reversedSecondHalfValues[i]}: ${isMatch ? 'Match' : 'No Match'}`,
            list: head,
            list2: reversedSecondListHead,
            pointers: { first: i },
            pointers2: { second: i },
            highlightNodes: [i],
            highlightNodes2: [i],
            code: `while (head1 != null && head2 != null) {
    if (head1.val != head2.val) {
        return false; // Mismatch
    }
    head1 = head1.next;
    head2 = head2.next;
}`,
            code2: `// Comparison result: ${isMatch ? 'Match' : 'No Match'}
// Continue checking remaining nodes if match`,
            reccurse: true,
            comparisonResult: isMatch
          });

          if (!isMatch) break;
        }
      }
    }

    steps.push({
      id: stepCount++,
      description: `Algorithm complete: List is ${palindromeResult ? '' : 'NOT '}a palindrome`,
      list: head,
      pointers: {},
      highlightNodes: [],
      code: `// (Optional: Restore original list by reversing second half again)
return ${palindromeResult};`,
      reccurse: false,
      finalResult: palindromeResult
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
                  First Half
                </h5>
                <LinkedListVisualizer
                  list={currentStepData.list}
                  highlightNodes={currentStepData.highlightNodes}
                  pointers={currentStepData.pointers}
                />
              </div>

              <div className="bg-green-50 rounded-lg p-4">
                <h5 className="text-lg font-medium text-green-800 mb-3">
                  Reversed Second Half
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
