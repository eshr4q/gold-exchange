import axios from 'axios';

export interface TestApiShemsh {
    price: number;
    rate: number;
    updated_at: string;
}

export const fetchPrice = async (): Promise<TestApiShemsh> => {
  const response = await axios.get<TestApiShemsh>(`https://testapi.shemsh.gold/api/app/gold/price`, {
    //headers: { accept: 'application/json' },
  });
  return response.data;
};
