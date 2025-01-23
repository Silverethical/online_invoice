import {
  NumberFormatBase,
  NumericFormatProps,
  useNumericFormat,
} from "react-number-format";

const persianNumeral: string[] = [
  "۰",
  "۱",
  "۲",
  "۳",
  "۴",
  "۵",
  "۶",
  "۷",
  "۸",
  "۹",
];

function CustomNumeralNumericFormat(props: NumericFormatProps) {
  const { format, removeFormatting, isCharacterSame, ...rest } =
    useNumericFormat(props);

  if (!format) return null;

  const _format = (val: string): string => {
    const _val = format ? format(val) : val;
    return _val.replace(/\d/g, ($1) => persianNumeral[Number($1)]);
  };

  const _removeFormatting = (val: string): string => {
    const _val = val.replace(new RegExp(persianNumeral.join("|"), "g"), ($1) =>
      String(persianNumeral.indexOf($1)),
    );
    return removeFormatting ? removeFormatting(_val) : _val;
  };

  const _isCharacterSame = (compareMeta: {
    formattedValue: string;
    currentValue: string;
    formattedValueIndex: number;
    currentValueIndex: number;
    lastValue: string;
  }): boolean => {
    if (!isCharacterSame) return false;

    const isCharSame = isCharacterSame(compareMeta);
    const {
      formattedValue,
      currentValue,
      formattedValueIndex,
      currentValueIndex,
    } = compareMeta;

    const curChar = currentValue[currentValueIndex];
    const newChar = formattedValue[formattedValueIndex];
    const curPersianChar = persianNumeral[Number(curChar)] ?? curChar;
    const newPersianChar = persianNumeral[Number(newChar)] ?? newChar;

    return isCharSame || curPersianChar === newPersianChar;
  };

  return (
    <NumberFormatBase
      {...rest}
      format={_format}
      removeFormatting={_removeFormatting}
      isCharacterSame={_isCharacterSame}
      displayType="text"
    />
  );
}

export default CustomNumeralNumericFormat;
