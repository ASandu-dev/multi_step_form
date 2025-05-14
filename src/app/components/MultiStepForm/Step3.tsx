// components/MultiStepForm/Step3.tsx
"use client";

import React from "react";
import { FormData, FormErrors, Option } from "../../types/formTypes";
import { Typography } from "@mui/material";

interface Step3Props {
  formData: FormData["step3"];
  updateFormData: (data: Partial<FormData["step3"]>) => void;
  errors: FormErrors["step3"];
}

const Step3: React.FC<Step3Props> = ({ formData, updateFormData, errors }) => {
  const options: Option[] = [
    {
      value: "Access to multiplayer games",
      label: "Online Service",
      price: "+$1/mo",
    },
    {
      value: "Extra 1TB of cloud storage",
      label: "Larger storage",
      price: "+$2/mo",
    },
    {
      value: "Custom theme on your profile",
      label: "Customizable Profile",
      price: "+$2/mo",
    },
  ];

  const handleCheckboxChange = (option: Option) => {
    const currentSelection = formData.selection || [];
    const isSelected = currentSelection.some(
      (item) => item.label === option.label
    );
    const updatedSelection = isSelected
      ? currentSelection.filter((item) => item.label !== option.label)
      : [...currentSelection, option];
    updateFormData({ selection: updatedSelection });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-blue-900 mb-4">Final Option</h2>

      <div className="mb-4">
        {options.map((option) => {
          const isChecked = (formData.selection || []).some(
            (item) => item.label === option.label
          );
          return (
            <div
              key={option.label}
              className={`flex justify-between shadow border rounded w-full mb-4 py-2 px-3 text-blue-900 leading-tight focus:outline-none bg-gray-100 focus:ring-2 focus:ring-blue-300 hover:border-blue-500`}
            >
              <input
                type="checkbox"
                checked={isChecked}
                onChange={() => handleCheckboxChange(option)}
                className="mr-4"
              />
              <div>
                <Typography>{option.label}</Typography>
                <Typography variant="subtitle2" className="text-gray-400">
                  {option.value}
                </Typography>
              </div>
              <div>
                <Typography>{option.price}</Typography>
              </div>
            </div>
          );
        })}
        {errors?.selection && (
          <p className="text-red-500 text-xs italic mt-1">{errors.selection}</p>
        )}
      </div>
    </div>
  );
};

export default Step3;
