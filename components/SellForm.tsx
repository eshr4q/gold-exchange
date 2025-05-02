'use client';

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import TransactionForm from '@/components/TransactionForm';
import {
  calculateFeeFromAmount,
  calculateTotalAmount,
  calculateUnitFromAmount
} from '@/lib/utils/amountCalculator';
import { toPersianDigits } from '@/lib/utils/toPersianDigits';

interface SellFormInputs {
  amount: number;
  weight: number;
}

const SellGoldPage = () => {
  const pricePerSoot = 65400;

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm<SellFormInputs>({
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
    }else if (weight === 0) {
      setValue('amount', 0, { shouldValidate: true });
      setFeeText('۰ ریال');
    }
  }, [weight]);

  useEffect(() => {
    if (amount && !isNaN(amount)) {
      const newWeight = calculateUnitFromAmount(pricePerSoot, amount);
      const newFee = calculateFeeFromAmount(pricePerSoot, newWeight);
      setValue('weight', newWeight, { shouldValidate: true });
      setFeeText(`${toPersianDigits(newFee)} ریال`);
    }else if (amount === 0) {
      setValue('weight', 0, { shouldValidate: true });
      setFeeText('۰ ریال');
    }
  }, [amount]);

  const onSubmit = (data: SellFormInputs) => {
    console.log("فروش طلا", data);
  };

  return (
    <TransactionForm
      onSubmit={handleSubmit(onSubmit)}
      register={register}
      errors={errors}
      isValid={isValid}
      submitButtonLabel="فروش طلا"
      feeText={feeText}
      control={control}
    />
  );
};

export default SellGoldPage;
