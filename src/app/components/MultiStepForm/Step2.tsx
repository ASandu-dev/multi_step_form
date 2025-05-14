"use client";
// components/MultiStepForm/Step2.tsx
import React from "react";
import { FormData, FormErrors } from "../../types/formTypes"; // Ensure correct path
import Image from "next/image";
import { Typography } from "@mui/material"; // Using Typography for text styling

interface Step2Props {
  formData: FormData["step2"];
  updateFormData: (data: Partial<FormData["step2"]>) => void;
  errors: FormErrors["step2"];
}

const Step2: React.FC<Step2Props> = ({ formData, updateFormData, errors }) => {
  // Define options data to easily map over
  const options = [
    {
      value: "option1",
      label: "Arcade",
      price: "$9/mo",
      icon: "./assets/images/icon-arcade.svg",
    },
    {
      value: "option2",
      label: "Advanced",
      price: "$12/mo",
      icon: "./assets/images/icon-advanced.svg",
    },
    {
      value: "option3",
      label: "Pro",
      price: "$15/mo",
      icon: "./assets/images/icon-pro.svg",
    },
  ];
  const handleToggleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateFormData({ isYearly: e.target.checked });
  };
  return (
    <div>
      <h2 className="text-2xl font-bold text-blue-950">Select your plan</h2>{" "}
      {/* Updated Heading */}
      <Typography variant="subtitle2" className="text-gray-400">
        You have the option of monthly or yearly billing.
      </Typography>
      {/* Added descriptive text */}
      {/* Options Container */}
      <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0 my-6">
        {" "}
        {/* Use flex-col on small, flex-row on md+, adjust spacing */}
        {options.map((option) => (
          // Label acts as the clickable card area
          <label
            key={option.label}
            className={`
              relative flex flex-row md:flex-col items-center md:items-start
              w-full md:w-[125px] h-[75px] md:h-[150px]
              p-4 border-2 rounded-md cursor-pointer
              hover:border-blue-500
              transition-colors duration-150 ease-in-out
              ${
                formData.selection === option.label
                  ? "bg-blue-50 border-blue-300"
                  : "border-blue-300"
              }
            `}
          >
            {/* Hidden Radio Input */}
            <input
              type="radio"
              name="selection" // Group radio buttons with the same name
              value={option.label}
              checked={formData.selection === option.label}
              onChange={() => updateFormData({ selection: option.label })}
              className="absolute opacity-0 peer"
            />

            {/* Card Content */}
            <div className="flex md:flex-col items-center md:items-start">
              {/* Container for icon and text */}
              {/* Icon */}
              <div className="mb-0 md:mb-8 mr-4 md:mr-0">
                {" "}
                {/* Adjust spacing for flex-row/flex-col */}
                <Image
                  src={option.icon}
                  alt={`${option.label} icon`}
                  width={40}
                  height={40}
                />{" "}
                {/* Corrected Image Path */}
              </div>
              {/* Text (Label and Price) */}
              <div className="flex flex-col">
                <Typography
                  variant="body1"
                  className="text-gray-900 font-semibold"
                >
                  {option.label}
                </Typography>
                {/* Use Typography for text */}
                <Typography variant="body2" className="text-gray-400">
                  {option.price}
                </Typography>
              </div>
            </div>
          </label>
        ))}
      </div>
      {/* --- Monthly/Yearly Toggle Switch --- */}
      <div className="flex items-center justify-center space-x-4 bg-gray-50 p-3 mb-[100px] rounded-md">
        <Typography
          variant="body2"
          className={`font-semibold ${
            !formData.isYearly ? "text-blue-900" : "text-gray-400"
          }`}
        >
          Monthly
        </Typography>

        {/* Toggle Switch HTML/Tailwind */}
        <div className="relative inline-block w-10 mx-4 align-middle select-none transition duration-200 ease-in">
          {/* Hidden Checkbox Input */}
          <input
            type="checkbox"
            name="billingCycle"
            id="billingCycleToggle"
            checked={formData.isYearly}
            onChange={handleToggleChange}
            className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer transition duration-200 ease-in checked:right-0 border-blue-900" // Basic checkbox styling
          />
          {/* Switch Track */}
          <label
            htmlFor="billingCycleToggle"
            className="toggle-label block overflow-hidden h-6 rounded-full bg-blue-900 cursor-pointer"
          >
            {/* Switch Thumb (moved by checked:right-0 on the input) */}
            {/* The thumb is the input itself, styled to look like a thumb */}
          </label>
        </div>

        <Typography
          variant="body2"
          className={`font-semibold ${
            formData.isYearly ? "text-blue-900" : "text-gray-400"
          }`}
        >
          Yearly
        </Typography>
      </div>
      {/* --- End Toggle Switch --- */}
      {/* Error message */}
      {errors?.selection && (
        <p className="text-red-500 text-xs italic mt-1">
          {errors.selection}
        </p>
      )}
    </div>
  );
};

export default Step2;
