export const calculateFee = (pricePerUnit: number, unit: number): number => {
    const rawAmount = pricePerUnit * unit;
    const feeRate = 0.005;
    const fee = Math.floor(rawAmount * feeRate);
    return fee;
};
  
export const calculateTotalAmount = (pricePerUnit: number, unit: number): number => {
    const rawAmount = pricePerUnit * unit;
    const fee = calculateFee(pricePerUnit, unit);
    return rawAmount + fee;
};
  
export const calculateUnitFromAmount = (pricePerUnit: number, totalAmount: number): number => {
    const feeRate = 0.005;
    const goldUnit = Math.floor(totalAmount / (pricePerUnit * (1 + feeRate)));
    return goldUnit;
};
  
export const calculateFeeFromAmount = (pricePerUnit: number, unit: number): number => {
    return calculateFee(pricePerUnit, unit);
};
  
export const calculateUnitAndCorrectAmount = (
    pricePerUnit: number,
    inputAmount: number
  ): { unit: number; correctedAmount: number | null } => {
    const minValidAmount = calculateTotalAmount(pricePerUnit, 1);
  
    // اگر کمتر از مبلغ یک سوته ول کن دیگه
    if (inputAmount < minValidAmount) {
      return { unit: 0, correctedAmount: null };
    }
  
    let unit = 1;
    while (true) {
      const minAmount = calculateTotalAmount(pricePerUnit, unit);
      const maxAmount = calculateTotalAmount(pricePerUnit, unit + 1);
  
      if (inputAmount >= minAmount && inputAmount < maxAmount) {
        return {
          unit,
          correctedAmount: minAmount,
        };
      }
  
      unit++;
    }
  };
  