// components/UI/ProgressIndicator.tsx
// Removed MUI imports
import React from 'react';
import { StepInfo } from '../../types/formTypes'; // Ensure this path is correct relative to your project structure

interface ProgressIndicatorProps {
  currentStepIndex: number; // Use index for comparison
  stepsInfo: StepInfo[]; // Accept array of step info objects
  // Removed totalSteps prop as it's redundant
  direction?: 'horizontal' | 'vertical';
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  currentStepIndex,
  stepsInfo,
  direction = 'horizontal',
}) => {
  return (
    <div
      // Adjusted flex direction and spacing based on direction
      // Added background image styling with corrected path format
      className={`flex ${
        direction === 'vertical' ? 'flex-col space-y-6' : 'flex-row justify-center space-x-4'
      } h-full rounded-lg md:mb-0 bg-[url('./assets/images/bg-sidebar-desktop.svg')] bg-cover bg-center p-6`} // Added p-6 for padding inside the bg div
    >
      {stepsInfo.map((step, index) => {
        const isCurrent = index === currentStepIndex;
        const isCompleted = index < currentStepIndex;

        return (
          // Outer container for each step item (number + text)
          <div key={step.number} className={`flex items-center ${direction === 'vertical' ? '' : 'flex-col'}`}>
            {/* Circle with Step Number */}
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center border-1
                ${isCurrent ? 'bg-blue-300 border-blue-900 text-black' :
                 isCompleted ? 'bg-green-custom border-green-custom text-white' :
                 'bg-transparent border-white text-white'}
              `}
            >
              {step.number}
            </div>

            {/* Step Name and Title */}
            <div className={`ml-3 ${direction === 'vertical' ? '' : 'text-center mt-2'}`}>
              <p className={`text-xs uppercase ${isCurrent || isCompleted ? 'text-gray-200' : 'text-white'}`}>
                {step.name}
              </p>
              <p className={`text-sm font-bold ${isCurrent || isCompleted ? 'text-white' : 'text-white'}`}>
                {step.title}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProgressIndicator;