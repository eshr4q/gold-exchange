'use client';

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import TransactionForm from '@/components/TransactionForm';
import {
  calculateFeeFromAmount,
  calculateTotalAmount,
  calculateUnitAndCorrectAmount
} from '@/lib/utils/amountCalculator';
import { toPersianDigits } from '@/lib/utils/toPersianDigits';
import useGoldPriceStore from '@/lib/store/goldPriceStore';
import { useDebounce } from 'use-debounce';

interface BuyFormInputs {
  amount: number;
  weight: number;
}

const BuyGoldPage = () => {
  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm<BuyFormInputs>({
    mode: 'onChange',
  });

  const { price, fetchPrice } = useGoldPriceStore();
  const [feeText, setFeeText] = React.useState('۰ ریال');
  const [activeField, setActiveField] = React.useState<'amount' | 'weight' | null>(null);

  const amount = watch('amount');
  const weight = watch('weight');

  // Debounce each input with a 500ms delay to prevent excessive calculations
  const [debouncedAmount] = useDebounce(amount, 500);
  const [debouncedWeight] = useDebounce(weight, 500);

  useEffect(() => {
    fetchPrice();
    const interval = setInterval(fetchPrice, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const activeElementName = document.activeElement?.getAttribute('name');
    if (activeElementName === 'weight') {
      setActiveField('weight');
    }
  }, [weight]);

  useEffect(() => {
    const activeElementName = document.activeElement?.getAttribute('name');
    if (activeElementName === 'amount') {
      setActiveField('amount');
    }
  }, [amount]);

  useEffect(() => {
    if (price === null) return;
    if (activeField !== 'weight') return;

    if (typeof debouncedWeight === 'number' && !isNaN(debouncedWeight)) {
      const newAmount = calculateTotalAmount(price, debouncedWeight);
      const newFee = calculateFeeFromAmount(price, debouncedWeight);
      setValue('amount', newAmount, { shouldValidate: true, shouldDirty: false });
      setFeeText(`${toPersianDigits(newFee)} ریال`);
    }
  }, [debouncedWeight]);


  // If user updates amount, calculate max valid gold units and correct the amount if needed
useEffect(() => {
  if (price === null) return;
  if (activeField !== 'amount') return;

  if (typeof debouncedAmount === 'number' && !isNaN(debouncedAmount)) {
    
    // If the user entered exactly the base gold price (without fee),
    // automatically add the fee and correct the amount and weight.
    if (debouncedAmount === price) {
      const correctedAmount = calculateTotalAmount(price, 1); // price + fee for 1 uint of gold
      const newFee = calculateFeeFromAmount(price, 1);
      const newWeight = 1;

      setValue('amount', correctedAmount, { shouldValidate: true, shouldDirty: false });
      setValue('weight', newWeight, { shouldValidate: true, shouldDirty: false });
      setFeeText(`${toPersianDigits(newFee)} ریال`);
      return; 
    }

    // Otherwise, calculate the maximum weight and correct the amount accordingly
    const { unit: newWeight, correctedAmount } = calculateUnitAndCorrectAmount(price, debouncedAmount);
    const newFee = calculateFeeFromAmount(price, newWeight);

    if (correctedAmount !== null) {
      setValue('amount', correctedAmount, { shouldValidate: true, shouldDirty: false });
    }

    setValue('weight', newWeight, { shouldValidate: true, shouldDirty: false });
    setFeeText(`${toPersianDigits(newFee)} ریال`);
  }
}, [debouncedAmount]);

  
  
  const onSubmit = (data: BuyFormInputs) => {
    console.log('خرید طلا', data);
  };

  return (
    <TransactionForm
      onSubmit={handleSubmit(onSubmit)}
      register={register}
      errors={errors}
      isValid={isValid}
      submitButtonLabel={'خرید طلا'}
      feeText={feeText}
      control={control}
    />
  );
};

export default BuyGoldPage;
