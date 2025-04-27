import React from "react";
import Image from "next/image";

const GoldPriceTicker = () => {
  return (
    <div className="flex items-center justify-between bg-[#FFFCF4] p-4 rounded shadow-sm w-full">

    <div className="w-10 h-10 relative ml-4">
      <Image
        src="/assets/gold-ingot.png"
        alt="gold ingot"
        fill
        className="object-contain"
      />
    </div>
  
    <div className="flex flex-col gap-2 w-full">
      
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-gray-700">
          قیمت حال حاضر یک سوت طلا
        </span>
        <span className="text-lg font-semibold text-gray-700">
          ۶۸,۱۸۰ ریال
        </span>
      </div>
  
      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-500">
          طلای ۱۸ عیار
        </span>
        <span className="text-xs text-green-500">
          +۰.۰۱٪
        </span>
      </div>
  
    </div>
  
  </div>
  
  );
};

export default GoldPriceTicker;
