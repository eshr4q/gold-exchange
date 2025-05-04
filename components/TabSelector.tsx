import React from 'react'

type TabSelectorProps = {
    activeTab: 'buy' | 'sell';
    onTabChange: (tab: 'buy' | 'sell') => void;
  };
  
  
  export default function TabSelector({ activeTab, onTabChange }: TabSelectorProps) {
    const getTabClass = (tab: 'buy' | 'sell') =>
      activeTab === tab ? 'bg-[#C99E38] text-white' : 'text-gray-600';

    return (
      <div className="flex w-full mt-10 bg-[#FFF9F1] rounded-[6px] p-1">
        <button
          className={`flex-1 text-center py-2 rounded-[6px] transition ${getTabClass('buy')}`}
          onClick={() => onTabChange('buy')}
          role="tab"
          aria-selected={activeTab === 'buy'}
        >
          خرید طلا
        </button>
        <button
          className={`flex-1 text-center py-2 rounded-[6px] transition ${getTabClass('sell')}`}
          onClick={() => onTabChange('sell')}
          role="tab"
          aria-selected={activeTab === 'sell'}
        >
          فروش طلا
        </button>
      </div>
    );
  }
  