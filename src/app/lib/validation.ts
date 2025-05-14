"use client";
// lib/validation.ts
import { FormData, FormErrors } from "../types/formTypes";

const validateEmail = (email: string): string | undefined => {
  if (!email) {
    return "Email is required";
  }
  // Basic regex for email validation
  if (!/\S+@\S+\.\S+/.test(email)) {
    return "Invalid email format";
  }
  return undefined; // No error
};
const validatePhoneNumber = (phone: string): string | undefined => {
  if (!phone) {
    return "Phone number is required";
  }

  const phoneRegex = /^[+]?[(]?\d*[)]?[-\s.]?\d*[)-\s.]?\d*[)-\s.]?\d*$/;
  if (!phoneRegex.test(phone.replace(/\s+/g, ""))) {
    // Test after removing spaces
    return "Invalid phone number format";
  }
  // Optional: add minimum digit check if needed
  const digitsOnly = phone.replace(/\D/g, "");
  if (digitsOnly.length < 10) {
    // Example: require at least 10 digits
    return "Phone number must have at least 10 digits";
  }

  return undefined; // No error
};
const validateStep1 = (data: FormData["step1"]): FormErrors["step1"] => {
  const errors: FormErrors["step1"] = {};
  if (!data.name) {
    errors.name = "Name is required";
  }
  const emailError = validateEmail(data.email);
  if (emailError) {
    errors.email = emailError;
  }
  const phoneError = validatePhoneNumber(data.phoneNumber);
  if (phoneError) {
    errors.phoneNumber = phoneError; // Assign the error to the errors object
  }

  return Object.keys(errors).length > 0 ? errors : undefined;
};

const validateStep2 = (data: FormData["step2"]): FormErrors["step2"] => {
  const errors: FormErrors["step2"] = {};
  if (!data.selection) {
    // Assuming 'selection' is a required field in step 2
    errors.selection = "Please make a selection";
  }
  return Object.keys(errors).length > 0 ? errors : undefined;
};

const validateStep3 = (data: FormData["step3"]): FormErrors["step3"] => {
  const errors: FormErrors["step3"] = {};
  if (!data.selection) {
    // Assuming 'option' is a required field in step 3
    errors.selection = "Please select an option";
  }
  return Object.keys(errors).length > 0 ? errors : undefined;
};

// Function to validate the current step
export const validateCurrentStep = (
  step: number,
  data: FormData
): FormErrors => {
  const errors: FormErrors = {};
  switch (step) {
    case 0: // Step 1 (index 0)
      const step1Errors = validateStep1(data.step1);
      if (step1Errors) {
        errors.step1 = step1Errors;
      }
      break;
    case 1: // Step 2 (index 1)
      const step2Errors = validateStep2(data.step2);
      if (step2Errors) {
        errors.step2 = step2Errors;
      }
      break;
    case 2: // Step 3 (index 2)
      const step3Errors = validateStep3(data.step3);
      if (step3Errors) {
        errors.step3 = step3Errors;
      }
      break;
    // Add cases for other steps
  }
  return errors;
};
