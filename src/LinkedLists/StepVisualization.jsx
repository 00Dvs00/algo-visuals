
const StepCounter = ({currentStep, steps, currentStepData, isPalindrome}) => {
  return (
    <>
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
    </>
  );
}

export default StepCounter;