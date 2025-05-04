'use client';

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import TransactionForm from '@/components/TransactionForm';
import {
  calculateFeeFromAmount,
  calculateTotalAmount,
  calculateUnitFromAmount,
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

  useEffect(() => {
    if (price === null) return;
    if (activeField !== 'amount') return;
  
    if (typeof debouncedAmount === 'number' && !isNaN(debouncedAmount)) {
      const { unit: newWeight, correctedAmount } = calculateUnitAndCorrectAmount(price, debouncedAmount);
      const newFee = calculateFeeFromAmount(price, newWeight);
  
      // فقط اگر عدد وارد شده در بازه معتبری بود، فیلد amount رو اصلاح کن
      if (correctedAmount !== null) {
        setValue('amount', correctedAmount, { shouldValidate: true, shouldDirty: false });
      }
  
      // همیشه وزن و کارمزد رو آپدیت کن (وزن ممکنه ۰ باشه)
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
