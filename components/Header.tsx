"use client";

import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between w-full sm:p-6 bg-white p-4">
      <button
        onClick={() => router.back()}
        className="p-2 rounded-[6px]-full hover:bg-gray-100 transition-colors"
        aria-label="بازگشت"
      >
        <ArrowRight className="w-6 h-6" />
      </button>
      <h1 className="text-lg text-center flex-1 text-[#333333]">
        خرید و فروش طلا
      </h1>
      <div className="w-10" />
    </header>
  );
}
