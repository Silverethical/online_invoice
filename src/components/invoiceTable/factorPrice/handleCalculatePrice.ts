import { GridValidRowModel } from "@mui/x-data-grid";
import { convertToNumber } from "../../../helpers/convertToNumber";

type HandleCalculatePriceProps = {
  rows: readonly GridValidRowModel[];
  setDiscountPrice: (value: number) => void;
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
  const total = rows.reduce((sum, row) => {
    const rowTotal = convertToNumber(row["total-amount"]);
    return sum + +rowTotal;
  }, 0);

  let discountAmount = 0;
  if (discountInputRef.current) {
    const inputValue = convertToNumber(discountInputRef.current.value);

    if (discountType === "درصد") {
      discountAmount = total * (+inputValue / 100);
    } else if (discountType === "مبلغ") {
      discountAmount = +inputValue;
    }
  }

  const finalPrice = Math.max(total - discountAmount, 0);

  setFullPrice(total);
  setDiscountPrice(finalPrice);
};
