// components/MultiStepForm/Summary.tsx
"use client";
import React from "react";
import { FormData } from "../../types/formTypes";

interface SummaryProps {
  formData: FormData;
  goToStep: (index: number) => void;
}

const Summary: React.FC<SummaryProps> = ({ formData, goToStep }) => {
  const handleEdit = (stepIndex: number) => {
    goToStep(stepIndex);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-blue-950 mb-4">Order Summary</h2>

      <div className="bg-blue-50 p-6 rounded-lg mb-6">
        <h3 className="text-xl font-semibold text-blue-900 mb-3">
          Personal Details
        </h3>
        <p className="text-blue-900 mb-2">
          <strong>Name:</strong> {formData.step1.name}
        </p>
        <p className="text-blue-900 mb-2"> {/* Added mb-2 for spacing */}
          <strong>Email:</strong> {formData.step1.email}
        </p>
        <p className="text-blue-900">
          <strong>Phone Number:</strong> {formData.step1.phoneNumber} {/* Corrected label */}
        </p>
        <button
          onClick={() => handleEdit(0)}
          className="text-blue-500 hover:underline text-sm mt-2 focus:outline-none focus:ring-2 focus:ring-blue-300 rounded"
        >
          Edit
        </button>
      </div>

      <div className="bg-blue-50 p-6 rounded-lg mb-6">
        <h3 className="text-xl font-semibold text-blue-900 mb-3">Plan Selection</h3> {/* Changed title */}
        <p className="text-blue-900 mb-2"> {/* Added mb-2 for spacing */}
          <strong>Package:</strong> {formData.step2.selection || "No selection made"}
        </p>
        <p className="text-blue-900">
          <strong>Period:</strong>{" "} {/* Added space */}
          {formData.step2.isYearly === true
            ? "Yearly"
            : formData.step2.isYearly === false
            ? "Monthly"
            : "No option selected"}
        </p>

        <button
          onClick={() => handleEdit(1)}
          className="text-blue-500 hover:underline text-sm mt-2 focus:outline-none focus:ring-2 focus:ring-blue-300 rounded"
        >
          Edit
        </button>
      </div>

      <div className="bg-blue-50 p-6 rounded-lg mb-6">
        <h3 className="text-xl font-semibold text-blue-900 mb-3">
          Add-ons
        </h3>
        {formData.step3.selection.length > 0 ? (
          <ul>
            {formData.step3.selection.map((option, index) => (
              <li key={index} className="text-blue-900 mb-2 last:mb-0"> {/* Added keys and spacing */}
                <strong>{option.label}:</strong> {option.value} ({option.price})
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-blue-900">No add-ons selected.</p>
        )}

        <button
          onClick={() => handleEdit(2)}
          className="text-blue-500 hover:underline text-sm mt-2 focus:outline-none focus:ring-2 focus:ring-blue-300 rounded"
        >
          Edit
        </button>
      </div>

      {/* Confirmation is handled by the main MultiStepForm component's final button */}
    </div>
  );
};

export default Summary;