'use client';

import React, { useEffect, useState } from 'react';
import { FieldErrors, UseFormRegister, Controller, Control, useWatch } from 'react-hook-form';
import { toPersianDigits } from '@/lib/utils/toPersianDigits';
import { toEnglishDigits } from '@/lib/utils/toPersianDigits';
import { toTomanString } from '@/lib/utils/toTomanString';
import { fetchPrice } from '@/lib/services/test-api';

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
  const [isButtonActive, setIsButtonActive] = useState(false);
  const [price, setPrice] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setAmountDisplay(toPersianDigits(watchedAmount ?? ''));
  }, [watchedAmount]);

  useEffect(() => {
    setWeightDisplay(toPersianDigits(watchedWeight ?? ''));
  }, [watchedWeight]);

  useEffect(() => {
    if (watchedAmount || watchedWeight) {
      setIsButtonActive(true);
    } else {
      setIsButtonActive(false);
    }
  }, [watchedAmount, watchedWeight]);


  useEffect(() => {
    const loadPrice = async () => {
      try {
        const data = await fetchPrice();
        setPrice(data.price);
      } catch (err: any) {
        setError('Failed to load the price');
      }
    };
    loadPrice();
  }, []);


  return (
    <>
    <form onSubmit={onSubmit} className="flex flex-col gap-10 w-full">
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-700">{amountLabel}</label>
        <div className="relative">
          <Controller
            control={control}
            name="amount"
            rules={{
              validate: (value) => {
                if (!price) return true;
                if (value === "" || value === 0) {
                  return true; 
                }
                if (value < price) return `مبلغ وارد شده باید حداقل ${toPersianDigits(price)} ریال باشد.`;
                if (value > 2000000000) return `حداکثر مبلغ قابل قبول ${toPersianDigits(2000000000)} ریال است.`;
                return true;
              }
            }}
            render={({ field }) => (
              <input
                name="amount"
                type="text"
                inputMode="numeric"
                placeholder={toPersianDigits(0)}
                value={amountDisplay}
                onChange={(e) => {
                  const raw = e.target.value;
                  const english = toEnglishDigits(raw).replace(/[^\d]/g, '');
                  field.onChange(Number(english), { shouldValidate: true });
                  setAmountDisplay(toPersianDigits(english));
                }}
                className="w-full border border-[#DED8F1] rounded-[6px] p-3 pr-5 text-right text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#B9A2FD]"
              />
            )}
          />
          <span className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400 text-sm">ریال</span>
        </div>
        {(watchedAmount || watchedAmount === 0) && (
          <div className="flex justify-between items-center text-xs mt-1">
            {errors.amount ? (
              <span className="text-red-500 text-xs">
              {(typeof errors.amount.message === 'string' && errors.amount.message) || 'مقدار الزامی است'}
          </span>
            ) : watchedAmount ? (
              <span className="text-gray-500">معادل {toPersianDigits(toTomanString(watchedAmount))} </span>
            ) : null}
          </div>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-700">{weightLabel}</label>
        <div className="relative">
          <Controller
            control={control}
            name="weight"
            render={({ field }) => (
              <input
                name='weight'
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
        {(watchedWeight || watchedWeight === 0) && (
          <div className="flex justify-between items-center text-xs mt-1">
            {errors.weight ? (
              <span className="text-red-500">مقدار طلا الزامی است</span>
            ) : watchedWeight ? (
              <span className="text-gray-500">معادل {toPersianDigits(Number(watchedWeight * 0.001).toFixed(3))} گرم</span>
            ) : null}
          </div>
        )}
      </div>

      <div className="flex justify-between text-sm text-[#333333] border-b pb-4 border-[#E4E7E8]">
        <span>کارمزد خرید :</span>
        <span>{feeText}</span>
      </div>

      <div className="bg-[#FBFBFB] self-center-safe lg:w-[670px] md:w-[580px] sm:w-[510px] w-full px-6 p-4 fixed bottom-0">
        <button
          type="submit"
          disabled={!isButtonActive}
          className={`w-full py-3 rounded-[6px] font-semibold transition ${
            isButtonActive ? 'bg-[#C99E38] text-white hover:bg-[#C99E38]' : 'bg-[#D7DEE0] text-gray-500 cursor-not-allowed'
          }`}
        >
          {submitButtonLabel}
        </button>
      </div>
    </form>
        </>
  );
};

export default TransactionForm;
