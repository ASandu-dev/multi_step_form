export interface Option {
  value: string;
  label: string;
  price: string;
}
// types/formTypes.ts
export interface FormData {
  step1: {
    name: string;
    email: string;
    phoneNumber: string;
  };
  step2: {
    selection: string;
    isYearly: boolean;
  };
  step3: {
    selection: Option[];
  };
  // Add more steps and fields as needed
}

export interface StepInfo {
  number: number;
  name: string;
  title: string;
}

export interface FormErrors {
  step1?: {
    phoneNumber?: string;
    name?: string;
    email?: string;
  };
  step2?: {
    selection?: string;
  };
  step3?: {
    selection?: string;
  };
  // Add more errors as needed
}
