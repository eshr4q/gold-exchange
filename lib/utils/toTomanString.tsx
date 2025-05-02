export function toTomanString(input: number):  string {
    const toman = Math.floor(input / 10);
  
    const million = Math.floor(toman / 1000000);
    const thousand = Math.floor((toman % 1000000) / 1000);
    const hundred = toman % 1000;
  
    let result = '';
    if (million > 0) result += `${million} میلیون`;
    if (thousand > 0) result += `${result ? ' و ' : ''}${thousand} هزار`;
    if (hundred > 0) result += `${result ? ' و ' : ''}${hundred}`;
  
    return result + ' تومان';
}
