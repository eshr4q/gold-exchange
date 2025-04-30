'use client';

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import TransactionForm from '@/components/TransactionForm';
import {
  calculateFeeFromAmount,
  calculateTotalAmount,
  calculateSootFromAmount
} from '@/lib/utils/amountCalculator';
import { toPersianDigits } from '@/lib/utils/toPersianDigits';

interface BuyFormInputs {
  amount: number;
  weight: number;
}

const BuyGoldPage = () => {
  const pricePerSoot = 65400;

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm<BuyFormInputs>({
    mode: 'onChange',
  });

  const [feeText, setFeeText] = useState('۰ ریال');

  const amount = watch('amount');
  const weight = watch('weight');

  useEffect(() => {
    if (weight && !isNaN(weight)) {
      const newAmount = calculateTotalAmount(pricePerSoot, weight);
      const newFee = calculateFeeFromAmount(pricePerSoot, weight);
      setValue('amount', newAmount, { shouldValidate: true });
      setFeeText(`${toPersianDigits(newFee)} ریال`);
    }
  }, [weight]);

  useEffect(() => {
    if (amount && !isNaN(amount)) {
      const newWeight = calculateSootFromAmount(pricePerSoot, amount);
      const newFee = calculateFeeFromAmount(pricePerSoot, newWeight);
      setValue('weight', newWeight, { shouldValidate: true });
      setFeeText(`${toPersianDigits(newFee)} ریال`);
    }
  }, [amount]);

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
      feeText={feeText}
    />
  );
};

export default BuyGoldPage;
