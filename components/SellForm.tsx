'use client';

import React, { useEffect, useRef, useState, useMemo } from 'react';
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

  const [pricePerUnit, setPricePerUnit] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const amount = watch('amount');
  const weight = watch('weight');
  const activeField = document.activeElement?.getAttribute('name') as 'amount' | 'weight' | null;

  const [debouncedAmount] = useDebounce(amount, 500);
  const [debouncedWeight] = useDebounce(weight, 500);

  useEffect(() => {
    const getPrice = async () => {
      const data = await fetchPrice();
      if (data) {
        setPricePerUnit(data.price);
      } else {
        setError("خطا در گرفتن قیمت طلا");
      }
    };

    getPrice();
    intervalRef.current = setInterval(getPrice, 30000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);


  // Unified fee calculation logic (removes redundancy)
  const feeText = useMemo(() => {
    if (!pricePerUnit) return '۰ ریال';
    const baseAmount = activeField === 'weight' ? debouncedWeight : debouncedAmount;
    if (!baseAmount || isNaN(baseAmount)) return '۰ ریال';
    return `${toPersianDigits(calculateFeeFromAmount(pricePerUnit, baseAmount))} ریال`;
  }, [pricePerUnit, debouncedAmount, debouncedWeight]);

  // Sync amount ↔ weight calculation efficiently
  useEffect(() => {
    if (!pricePerUnit) return;
    if (activeField === 'weight' && typeof debouncedWeight === 'number' && !isNaN(debouncedWeight)) {
      setValue('amount', calculateTotalAmount(pricePerUnit, debouncedWeight), { shouldValidate: true });
    } else if (activeField === 'amount' && typeof debouncedAmount === 'number' && !isNaN(debouncedAmount)) {
      setValue('weight', calculateUnitFromAmount(pricePerUnit, debouncedAmount), { shouldValidate: true });
    }
  }, [debouncedAmount, debouncedWeight, activeField]);

  const onSubmit = (data: SellFormInputs) => {
    console.log('فروش طلا:', data);
  };


  return (
    <TransactionForm
      onSubmit={handleSubmit(onSubmit)}
      register={register}
      errors={errors}
      isValid={isValid && pricePerUnit !== null}
      submitButtonLabel={pricePerUnit ? 'در حال دریافت قیمت...' : 'خرید طلا'}
      feeText={feeText}
      control={control}
    />
  );
};

export default SellGoldPage;
