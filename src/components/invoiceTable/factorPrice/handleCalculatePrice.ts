import { GridValidRowModel } from "@mui/x-data-grid";
import { convertToNumber } from "../../../helpers/convertToNumber";
import { formatWithCommas } from "../../../helpers/formatWithCommas";

type HandleCalculatePriceProps = {
  rows: readonly GridValidRowModel[];
  setDiscountPrice: (value: string) => void;
  setFullPrice: (value: number) => void;
  discountInputRef: React.RefObject<HTMLInputElement>;
  discountType: string;
};

export const handleCalculatePrice = ({
  rows,
  setDiscountPrice,
  setFullPrice,
  discountInputRef,
  discountType,
}: HandleCalculatePriceProps) => {
  const total = rows.reduce(
    (sum, row) => sum + +convertToNumber(row["total-amount"]),
    0,
  );

  if (!discountInputRef.current) {
    setFullPrice(total);
    setDiscountPrice(formatWithCommas(String(total)));
    return;
  }

  const rawDiscountValue = convertToNumber(discountInputRef.current.value);

  const formattedDiscountValue =
    discountType === "مبلغ"
      ? formatWithCommas(String(rawDiscountValue))
      : String(rawDiscountValue);

  discountInputRef.current.value = formattedDiscountValue;
  setDiscountPrice(formattedDiscountValue);

  const discountAmount =
    discountType === "درصد"
      ? (total * +rawDiscountValue) / 100
      : rawDiscountValue;

  const finalPrice = Math.max(total - +discountAmount, 0);

  setFullPrice(total);
  setDiscountPrice(formatWithCommas(String(finalPrice)));
};
