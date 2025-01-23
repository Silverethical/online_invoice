export const convertToNumber = (value: any): number | string => {
  if (typeof value === "number") return value;

  if (typeof value === "string") {
    const persianArabicToWestern = (str: string): string =>
      str.replace(/[\u0660-\u0669\u06F0-\u06F9]/g, (char) =>
        String(char.charCodeAt(0) - (char <= "\u0669" ? 0x0660 : 0x06f0)),
      );

    const numericValue = persianArabicToWestern(value).replace(
      /[^0-9.-]+/g,
      "",
    );

    return numericValue ? parseFloat(numericValue) : "";
  }

  return "";
};
