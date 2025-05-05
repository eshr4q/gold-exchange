'use client';

import React, { useEffect} from "react";
import Image from "next/image";
import { toPersianDigits } from "@/lib/utils/toPersianDigits";
import { Triangle } from 'lucide-react';
import useGoldPriceStore from "@/lib/store/goldPriceStore";

const GoldPriceTicker = () => {

  const { price, rate, fetchPrice, error } = useGoldPriceStore();

  useEffect(() => {
    fetchPrice();
    const interval = setInterval(fetchPrice, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-between bg-[#FFFCF4] p-2 sm:p-3 rounded-[6px] shadow-[0px_0px_5px_rgba(0,0,0,0.3)] w-full">
      <div className="w-10 h-10 relative ml-4">
        <Image
          src="/assets/gold-ingot.png"
          alt="gold ingot"
          fill
          sizes="(max-width: 600px) 40px, 80px"
        />
      </div>
      <div className="flex flex-col gap-2 w-full">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-700">
            قیمت حال حاضر یک سوت طلا
          </span>
          <span className="text-sm text-gray-700">
          <div aria-live="assertive">
          {price !== null ? (
            <span className="flex items-baseline gap-1">
              <span className="text-sm text-gray-700">
                {toPersianDigits(price)}
              </span>
              <span className="text-xs text-gray-500"> ریال </span>
            </span>
          ) : error}
          </div>
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500">
            طلای ۱۸ عیار
          </span>
          <span
            className={`text-xs flex items-center gap-1 ${
              rate !== null && rate >= 0 ? 'text-green-500' : 'text-red-500'
            }`}
          >
            {rate !== null ? `${toPersianDigits(rate.toFixed(2))}٪` : '...'}
          <Triangle
            size={10}
            fill="currentColor"
            className={`transform ${rate !== null && rate < 0 ? 'rotate-180' : ''}`}
          />
          </span>
        </div>
      </div>
    </div>
  );
};

export default GoldPriceTicker;
