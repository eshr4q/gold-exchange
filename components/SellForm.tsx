'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import TransactionForm from '@/components/TransactionForm';
import {
  calculateFeeFromAmount,
  calculateTotalAmount,
  calculateUnitFromAmount
} from '@/lib/utils/amountCalculator';
import { toPersianDigits } from '@/lib/utils/toPersianDigits';
import { fetchPrice } from '@/lib/services/test-api';
import { useDebounce } from 'use-debounce';

interface SellFormInputs {
  amount: number;
  weight: number;
}

const SellGoldPage = () => {
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
  const [pricePerUnit, setPricePerUnit] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const amount = watch('amount');
  const weight = watch('weight');

  const [debouncedAmount] = useDebounce(amount, 300);
  const [debouncedWeight] = useDebounce(weight, 300);

  const sourceField = useRef<'amount' | 'weight' | null>(null);

  useEffect(() => {
    const getPrice = async () => {
      try {
        const data = await fetchPrice();
        setPricePerUnit(data.price);
      } catch (error) {
        console.error('خطا در گرفتن قیمت طلا:', error);
      } finally {
        setIsLoading(false);
      }
    };

    getPrice();
  }, []);


  useEffect(() => {
    if (pricePerUnit === null || isLoading) return;
    if (sourceField.current !== 'weight') return;

    if (typeof debouncedWeight === 'number' && !isNaN(debouncedWeight)) {
      const newAmount = calculateTotalAmount(pricePerUnit, debouncedWeight);
      const newFee = calculateFeeFromAmount(pricePerUnit, debouncedWeight);
      setValue('amount', newAmount, { shouldValidate: true });
      setFeeText(`${toPersianDigits(newFee)} ریال`);
    }
  }, [debouncedWeight]);


  useEffect(() => {
    if (pricePerUnit === null || isLoading) return;
    if (sourceField.current !== 'amount') return;

    if (typeof debouncedAmount === 'number' && !isNaN(debouncedAmount)) {
      const newWeight = calculateUnitFromAmount(pricePerUnit, debouncedAmount);
      const newFee = calculateFeeFromAmount(pricePerUnit, newWeight);
      setValue('weight', newWeight, { shouldValidate: true });
      setFeeText(`${toPersianDigits(newFee)} ریال`);
    }
  }, [debouncedAmount]);


  useEffect(() => {
    sourceField.current = 'weight';
  }, [weight]);

  useEffect(() => {
    sourceField.current = 'amount';
  }, [amount]);

  const onSubmit = (data: SellFormInputs) => {
    console.log('فروش طلا', data);
  };

  return (
    <TransactionForm
      onSubmit={handleSubmit(onSubmit)}
      register={register}
      errors={errors}
      isValid={isValid && !isLoading}
      submitButtonLabel={isLoading ? 'در حال دریافت قیمت...' : 'خرید طلا'}
      feeText={feeText}
      control={control}
    />
  );
};

export default SellGoldPage;
