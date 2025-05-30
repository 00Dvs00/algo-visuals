import React, { useState, useEffect, useRef } from "react";
import LinkedListVisualizer from "./LinkedListVisualizer";
import { createMinHeap } from "./MinHeap";
import { createLinkedList } from "./ListNode";

const MergeKLinkedList = () => {
  const [inputValues, setInputValues] = useState('1,4,5');
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [listCount, setListCount] = useState(1);
  const [steps, setSteps] = useState([]);
  const [headArray, setHeadArray] = useState([]);
  const minHeap = useRef(createMinHeap());
  const [heapSnapShot , setHeapSnapShot] = useState([]);

  const createVisualizationSteps = (headArray) => {
    for(let head of headArray){
      if(head) minHeap.current.insert(head);
    }
    setHeapSnapShot(minHeap.current.getHeap());

    return steps;
  }

  const handleCreateList = () => {
    const values = inputValues.split(',').map(v => parseInt(v.trim())).filter(v => !isNaN(v));
    const head = createLinkedList(values);
    setHeadArray(prev => [...prev, head]);
    setListCount(prev => prev + 1);
    setCurrentStep(0);
    setIsPlaying(false);
  };

  useEffect(() => {
    const steps = createVisualizationSteps(headArray);
    setSteps(steps);
    if (steps.length > 0) {
      setHeapSnapShot(steps[0]);
    }
  }, [headArray]);


  const currentStepData = {};

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              Merge K Linked List Visualizer
            </h1>
            <p className="text-lg text-gray-600">
              Watch how the algorithm merges K linked lists
            </p>
          </div>
        </div>

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
                Create List {`${listCount}`}
              </button>

              <button
                /* onClick={prevStep} */
                /* disabled={currentStep === 0} */
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200 font-medium"
              >
                Previous
              </button>

              <button
                /* onClick={nextStep}
                disabled={currentStep >= steps.length - 1} */
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200 font-medium"
              >
                Next
              </button>

              <button
                /* onClick={playAnimation}
                disabled={isPlaying} */
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-green-300 disabled:cursor-not-allowed transition-colors duration-200 font-medium"
              >
                {isPlaying ? 'Playing...' : 'Play Animation'}
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h4 className="text-xl font-semibold text-gray-800 mb-4">
            Linked List Visualization
          </h4>

          <div className="grid md:grid-cols-3 gap-6">
            {
              headArray.map((head,index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-4">
                  <LinkedListVisualizer
                    list={head}
                    highlightNodes={[]}
                    pointers={{}}
                  />
                </div>
              ))
            }
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <h4 className="text-xl font-semibold text-gray-800 mb-4">Min Heap</h4>
            <div className="flex gap-4 flex-wrap">
              {heapSnapShot.map((node, index) => (
                <div
                  key={index}
                  className="px-4 py-2 bg-yellow-100 border border-yellow-400 text-yellow-800 rounded-lg shadow"
                >
                  {node.val}
                </div>
              ))}
            </div>
          </div>


          <div className="bg-gray-50 rounded-lg p-4">
            <h5 className="text-lg font-medium">Result</h5>
            <LinkedListVisualizer
              list={currentStepData.list}
              highlightNodes={currentStepData.highlightNodes}
              pointers={currentStepData.pointers}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default MergeKLinkedList;