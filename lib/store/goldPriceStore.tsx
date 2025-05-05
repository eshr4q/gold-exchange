import { create } from "zustand";
import axios from "axios";

interface GoldPriceState {
  price: number | null;
  rate: number | null;
  error: string | null;
  fetchPrice: () => Promise<void>;
}

const useGoldPriceStore = create<GoldPriceState>((set) => ({
  price: null,
  rate: null,
  error: null,
  fetchPrice: async () => {
    try {
      const response = await axios.get("https://testapi.shemsh.gold/api/app/gold/price");
      set({
        price: response.data.price,
        rate: response.data.rate,
        error: null,
      });
    } catch (error) {
      set({ error: "خطا در دریافت قیمت طلا" });    }
  },
}));

export default useGoldPriceStore;
