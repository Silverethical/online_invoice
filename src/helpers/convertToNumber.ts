export const convertToNumber = (value: any): number => {
  if (typeof value === "number") return value;
  if (typeof value === "string") {
    const numericValue = value.replace(/[^0-9.-]+/g, "");
    return Number(parseFloat(numericValue) || 0);
  }
  return 0;
};
