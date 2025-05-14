// components/MultiStepForm/MultiStepForm.tsx
"use client";

import React, { useState } from 'react';
import { useMultistepForm } from '../../hooks/useMultistepForm';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Summary from './Summary';
import Button from '../../components/UI/Button';
import ProgressIndicator from '../../components/UI/ProgressIndicator';
// Ensure StepInfo is imported from your types file
import { FormData, FormErrors, StepInfo } from '../../types/formTypes';
import { validateCurrentStep } from '../../lib/validation';

const initialFormData: FormData = {
  step1: {
    name: '', email: '', phoneNumber: '',
  },
  step2: { selection: '', isYearly: false },
  step3: { option: '' },
};

// Define the information for each step
// This array needs to be defined so it can be passed to the ProgressIndicator
const stepsInfo: StepInfo[] = [
    { number: 1, name: 'STEP1', title: 'YOUR INFO' },
    { number: 2, name: 'STEP2', title: 'SELECT PLAN' },
    { number: 3, name: 'STEP3', title: 'ADD-ONS' },
    { number: 4, name: 'STEP4', title: 'SUMMARY' },
];


const MultiStepForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<FormErrors>({});

  const updateFormData = (step: keyof FormData, data: Partial<FormData[typeof step]>) => {
    setFormData(prev => ({
      ...prev,
      [step]: { ...prev[step], ...data },
    }));
  };

  // Ensure the order of stepsComponents matches the order in stepsInfo
  const stepsComponents = [
    <Step1
      key="step1"
      formData={formData.step1}
      updateFormData={(data) => updateFormData('step1', data)}
      errors={errors.step1} stepName={''}    />,
    <Step2
      key="step2"
      formData={formData.step2}
      updateFormData={(data) => updateFormData('step2', data)}
      errors={errors.step2}
    />,
     <Step3
      key="step3"
      formData={formData.step3}
      updateFormData={(data) => updateFormData('step3', data)}
      errors={errors.step3}
    />,
    <Summary
      key="summary"
      formData={formData}
      goToStep={(index) => goTo(index)}
    />,
  ];

  // useMultistepForm hook now uses stepsComponents
  const { currentStepIndex, step, isFirstStep, isLastStep, back, next, goTo } = useMultistepForm(stepsComponents);

  const handleNext = () => {
    // 1. Run validation for the current step
    const currentStepErrors = validateCurrentStep(currentStepIndex, formData);

    // 2. Update the state to display errors (this is asynchronous)
    setErrors(currentStepErrors);

    // 3. Check the result of the validation *directly* from the variable
    const stepErrorKeys: (keyof FormErrors)[] = ['step1', 'step2', 'step3']; // Keys corresponding to form steps
    const currentValidationKey = stepErrorKeys[currentStepIndex]; // Get the key for the current step

    // Check if errors exist for the current step's key AND that object of errors is not empty
    const stepHasErrors = currentValidationKey && currentStepErrors[currentValidationKey] && Object.keys(currentStepErrors[currentValidationKey]!).length > 0;


    if (stepHasErrors) {
       console.log('Validation failed for step', currentStepIndex + 1, currentStepErrors);
       // If there are errors for the current step, stop the function here
       return;
    }

    // If we reach here, validation passed for the current step

    // Optional: Clear errors for the *next* step before proceeding
    // setErrors({}); // You might want to keep errors visible until the user fixes them or moves back

    // Proceed to the next step if not on the last step
    if (!isLastStep) {
       next();
    } else {
        // If it's the last step and validation passed (though validation to summary happens *before* reaching this state)
        // This branch is less common if handleNext is only for moving *between* form steps
        handleSubmit(); // Call submit function
    }
  };


  const handleSubmit = () => {
    // Final validation on submit if needed, but often validation per step is sufficient
    console.log('Form submitted successfully:', formData);
    alert('Order Confirmed!');
    // Handle actual submission logic here (e.g., API call)
  };

  return (
    <div
      className="flex flex-col md:flex-row items-center md:items-start justify-center min-h-screen bg-blue-100 p-4
                  bg-cover bg-center">
      <div className="w-full max-w-sm md:max-w-3xl my-auto bg-white shadow-md rounded-lg p-2 flex flex-col md:flex-row md:space-x-12"> 

        {/* Left Column: Steps Indicator */}
        <div className="md:w-1/3 flex justify-center md:justify-start p-6 md:p-0"> 
            {/* Pass stepsInfo and currentStepIndex */}
            <ProgressIndicator
                currentStepIndex={currentStepIndex}
                stepsInfo={stepsInfo} // <--- Pass stepsInfo here
                direction="vertical"
            />
        </div>

        {/* Right Column: Step Content and Navigation */}
        <div className="md:w-2/3 mt-8 md:mt-0 p-6"> {/* Allocate width for the right column, add top margin on small screens, added padding */}
            {step} {/* Render the current step component */}

             {/* Navigation Buttons */}
            <div className={`flex ${isFirstStep ? 'justify-end' : 'justify-between'} mt-6`}>
              {!isFirstStep && (
                // Go back button should not appear on the Summary step if you can only edit via links
                 currentStepIndex !== stepsComponents.length -1 && (
                    <Button variant="secondary" onClick={back} type="button">
                    Go Back
                    </Button>
                 )
              )}

              {currentStepIndex === stepsComponents.length - 1 ? ( // Check index against the actual stepsComponents array length
                 <Button variant="submit" onClick={handleSubmit} type="button">
                   Confirm Order
                 </Button>
               ) : (
                 <Button variant="primary" onClick={handleNext} type="button">
                   Next Step
                 </Button>
               )}
            </div>
        </div>
      </div>
    </div>
  );
};

export default MultiStepForm;