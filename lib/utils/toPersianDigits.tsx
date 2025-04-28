export function toPersianDigits(input: string | number): string {
    return input
      .toString()
      .replace(/\d/g, (digit) => "۰۱۲۳۴۵۶۷۸۹"[parseInt(digit)]);
  }
  