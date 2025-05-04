import axios from 'axios';

export interface TestApiShemsh {
    price: number;
    rate: number;
    updated_at: string;
}
export const fetchPrice = async (): Promise<TestApiShemsh | null> => {
  try {
    const response = await axios.get<TestApiShemsh>("https://testapi.shemsh.gold/api/app/gold/price");
    return response.data;
  } catch (error) {
    console.error("Error fetching gold price:", error);
    return null; 
  }
};