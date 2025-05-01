'use client';

import React, { useEffect, useState } from 'react';
import { FieldErrors, UseFormRegister, Controller, Control, useWatch } from 'react-hook-form';
import { toPersianDigits } from '@/lib/utils/toPersianDigits';
import { toEnglishDigits } from '@/lib/utils/toPersianDigits';

interface TransactionFormProps {
  onSubmit: (e?: React.BaseSyntheticEvent) => void;
  register: UseFormRegister<any>;
  control: Control<any>;
  errors: FieldErrors;
  isValid: boolean;
  amountLabel?: string;
  weightLabel?: string;
  submitButtonLabel?: string;
  feeText?: string;
}

const TransactionForm: React.FC<TransactionFormProps> = ({
  onSubmit,
  register,
  control,
  errors,
  isValid,
  amountLabel = "مبلغ پرداختی با احتساب کارمزد",
  weightLabel = "مقدار طلا",
  submitButtonLabel = "خرید طلا",
  feeText = "۰ ریال"
}) => {
  const watchedAmount = useWatch({ control, name: 'amount' });
  const watchedWeight = useWatch({ control, name: 'weight' });

  const [amountDisplay, setAmountDisplay] = useState('');
  const [weightDisplay, setWeightDisplay] = useState('');

  useEffect(() => {
    setAmountDisplay(toPersianDigits(watchedAmount ?? ''));
  }, [watchedAmount]);

  useEffect(() => {
    setWeightDisplay(toPersianDigits(watchedWeight ?? ''));
  }, [watchedWeight]);

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-10 w-full">
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-700">{amountLabel}</label>
        <div className="relative">
          <Controller
            control={control}
            name="amount"
            render={({ field }) => (
              <input
                type="text"
                inputMode="numeric"
                placeholder={toPersianDigits(0)}
                value={amountDisplay}
                onChange={(e) => {
                  const raw = e.target.value;
                  const english = toEnglishDigits(raw).replace(/[^\d]/g, '');
                  field.onChange(Number(english));
                  setAmountDisplay(toPersianDigits(english));
                }}
                className="w-full border border-[#DED8F1] rounded-[6px] p-3 pr-5 text-right text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#B9A2FD]"
              />
            )}
          />
          <span className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400 text-sm">ریال</span>
        </div>
        {errors.amount && <span className="text-red-500 text-xs">مقدار الزامی است</span>}
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-700">{weightLabel}</label>
        <div className="relative">
          <Controller
            control={control}
            name="weight"
            render={({ field }) => (
              <input
                type="text"
                inputMode="numeric"
                placeholder={toPersianDigits(0)}
                value={weightDisplay}
                onChange={(e) => {
                  const raw = e.target.value;
                  const english = toEnglishDigits(raw).replace(/[^\d]/g, '');
                  field.onChange(Number(english));
                  setWeightDisplay(toPersianDigits(english));
                }}
                className="w-full border border-[#DED8F1] rounded-[6px] p-3 pr-5 text-right text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#B9A2FD]"
              />
            )}
          />
          <span className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400 text-sm">سوت</span>
        </div>
        {errors.weight && <span className="text-red-500 text-xs">مقدار طلا الزامی است</span>}
      </div>

      <div className="flex justify-between text-sm text-[#333333] border-b pb-4 border-[#E4E7E8]">
        <span>کارمزد خرید :</span>
        <span>{feeText}</span>
      </div>

      <div className="bg-[#c02727] -mx-10 px-4 pt-4 pb-6 mt-30 -mb-5">
        <button
          type="submit"
          disabled={!isValid}
          className={`w-full py-3 rounded-[6px] bg-yellow-500 text-white font-semibold transition ${
            !isValid ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#C99E38]'
          }`}
        >
          {submitButtonLabel}
        </button>
      </div>
    </form>
  );
};

export default TransactionForm;
