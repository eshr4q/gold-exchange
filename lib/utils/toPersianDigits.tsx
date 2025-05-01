export function toPersianDigits(input: string | number): string {
  return input
    .toString()
    .replace(/\d/g, (digit) => "۰۱۲۳۴۵۶۷۸۹"[parseInt(digit, 10)]);
}

export function toEnglishDigits(input: string): string {
  const persian = "۰۱۲۳۴۵۶۷۸۹";
  const english = "0123456789";
  return input.replace(/[۰-۹]/g, (d) => english[persian.indexOf(d)]);
}
