'use client';

import React from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';

interface TransactionFormProps {
  onSubmit: (e?: React.BaseSyntheticEvent) => void;
  register: UseFormRegister<any>;
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
  errors,
  isValid,
  amountLabel = "مبلغ پرداختی با احتساب کارمزد",
  weightLabel = "مقدار طلا",
  submitButtonLabel = "خرید طلا",
  feeText = "۰ ریال"
}) => {

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-10 w-full max-w-[600px] mx-auto">
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-700">
          {amountLabel}
        </label>
        <div className="relative">
          <input
            type="number"
            {...register('amount')}
            className="w-full border border-[#DED8F1] rounded p-3 pr-12 text-right text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#B9A2FD]"
          />
          <span className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 text-sm">
            ریال
          </span>
        </div>
        {errors.amount && <span className="text-red-500 text-xs">مقدار الزامی است</span>}
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-700">
          {weightLabel}
        </label>
        <div className="relative">
          <input
            type="number"
            {...register('weight')}
            className="w-full border border-[#DED8F1] rounded p-3 pr-12 text-right text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#B9A2FD]"
          />
          <span className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 text-sm">
            سوت
          </span>
        </div>
        {errors.weight && <span className="text-red-500 text-xs">مقدار طلا الزامی است</span>}
      </div>

      <div className="flex justify-between text-sm text-gray-600 border-b">
        <span>کارمزد خرید :</span>
        <span>{feeText}</span>
      </div>

      <button
        type="submit"
        disabled={!isValid}
        className={`w-full py-3 rounded bg-yellow-500 text-white font-semibold transition ${
          !isValid ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#C99E38]'
        }`}
      >
        {submitButtonLabel}
      </button>

    </form>
  );
};

export default TransactionForm;
