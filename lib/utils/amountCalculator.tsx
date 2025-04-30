export const calculateFee = (pricePerunit: number, unit: number): number => {
    const rawAmount = pricePerunit * unit;
    const feeRate = 0.005;
    const fee = Math.floor(rawAmount * feeRate);
    return fee;
};
  
export const calculateTotalAmount = (pricePerunit: number, unit: number): number => {
    const rawAmount = pricePerunit * unit;
    const fee = calculateFee(pricePerunit, unit);
    return rawAmount + fee;
};
  
export const calculateSootFromAmount = (pricePerunit: number, totalAmount: number): number => {
    const feeRate = 0.005;
    const goldUnit = Math.floor(totalAmount / (pricePerunit * (1 + feeRate)));
    return goldUnit;
};
  
export const calculateFeeFromAmount = (pricePerunit: number, unit: number): number => {
    return calculateFee(pricePerunit, unit);
};
  