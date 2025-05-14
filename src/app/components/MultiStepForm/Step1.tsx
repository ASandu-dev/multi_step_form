"use client"
// components/MultiStepForm/Step1.tsx
import React from 'react';
import Input from '../UI/Input';
import { FormData, FormErrors } from '../../types/formTypes';
import { Box, Typography } from '@mui/material';

interface Step1Props {
  formData: FormData['step1'];
  updateFormData: (data: Partial<FormData['step1']>) => void;
  stepName: string;
  errors: FormErrors['step1'];
}

const Step1: React.FC<Step1Props> = ({ formData, updateFormData,  errors }) => {  
  return (
    <Box className="my-12">
      <h2 className="text-2xl font-bold text-blue-950 py-1">Personal Information</h2>
      <Typography variant='subtitle2' className='text-gray-400'>Please provide your name, email address, and phone number.</Typography>
      <Input
        label="Name"
        id="name"
        type="text"
        value={formData.name}
        placeholder='e.g. Stephen King'
        onChange={(e) => updateFormData({ name: e.target.value })}
        error={errors?.name}
        className='border-gray-300 border-2 w-full p-1.5 rounded-md'
      />
      <Input
        label="Email Address"
        id="email"
        type="email"
        value={formData.email}
        placeholder='e.g. stephenking@lorem.com'
        onChange={(e) => updateFormData({ email: e.target.value })}
        error={errors?.email}
        className='border-gray-300 border-2 w-full p-1.5 rounded-md'
      />
      <Input
        label="Phone Number"
        id="phoneNumber"
        type="tel"
        value={formData.phoneNumber}
        placeholder='e.g. +1 234 567 890'
        onChange={(e) => updateFormData({ phoneNumber: e.target.value })}
        error={errors?.phoneNumber}
        className='border-gray-300 border-2 w-full p-1.5 rounded-md'
      />
    </Box>
  );
};

export default Step1;