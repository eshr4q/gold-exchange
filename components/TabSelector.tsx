
import React from 'react'


type TabSelectorProps = {
    activeTab: 'buy' | 'sell';
    onTabChange: (tab: 'buy' | 'sell') => void;
  };
  
  export default function TabSelector({ activeTab, onTabChange }: TabSelectorProps) {
    return (
      <div className="flex w-full max-w-md mx-auto mt-5 bg-[#FFF9F1] rounded-sm p-1">
        <button
          className={`flex-1 text-center py-2 rounded-sm transition ${
            activeTab === 'buy' ? 'bg-[#C99E38] text-white' : 'text-gray-600'
          }`}
          onClick={() => onTabChange('buy')}
        >
          خرید طلا
        </button>
        <button
          className={`flex-1 text-center py-2 rounded-sm transition ${
            activeTab === 'sell' ? 'bg-[#C99E38] text-white' : 'text-gray-600'
          }`}
          onClick={() => onTabChange('sell')}
        >
          فروش طلا
        </button>
      </div>
    );
  }
  