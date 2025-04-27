"use client";

import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between w-full bg-white p-4 border-b">

      <button
        onClick={() => router.back()}
        className="p-2 rounded-full hover:bg-gray-100 transition-colors"
        aria-label="بازگشت"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      <h1 className="text-lg font-bold text-center flex-1">
        خرید و فروش طلا
      </h1>
      <div className="w-10" />
    </header>
  );
}
