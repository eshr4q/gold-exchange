'use client'
import GoldPriceTicker from "@/components/GoldPriceTicker";
import TabSelector from "@/components/TabSelector";
import BuyForm from "@/components/BuyForm";
import SellForm from "@/components/SellForm";
import { useState } from "react";

export default function Home() {
  const [activeTab, setActiveTab] = useState<"buy" | "sell">("buy");

  return (
    <div className="font-[family-name:var(--font-geist-sans)] flex flex-col gap-8">

        <GoldPriceTicker />

        <TabSelector activeTab={activeTab} onTabChange={setActiveTab} />

        {activeTab === "buy" ? <BuyForm /> : <SellForm />}
    </div>
  );
}
