'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import TransactionForm from '@/components/TransactionForm';

interface BuyFormInputs {
  amount: number;
  weight: number;
}

const BuyGoldPage = () => {
  const { register, handleSubmit, formState: { errors, isValid } } = useForm<BuyFormInputs>({
    mode: 'onChange',
  });

  const onSubmit = (data: BuyFormInputs) => {
    console.log('خرید طلا', data);
  };

  return (
    <TransactionForm
      onSubmit={handleSubmit(onSubmit)}
      register={register}
      errors={errors}
      isValid={isValid}
      submitButtonLabel="خرید طلا"
    />
  );
};

export default BuyGoldPage;
