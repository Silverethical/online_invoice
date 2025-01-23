import { GridValidRowModel } from "@mui/x-data-grid";
import { convertToNumber } from "../../helpers/convertToNumber";

type HandleCalculatePriceProps = {
  rows: readonly GridValidRowModel[];
  setDiscountPrice: Function;
  setFullPrice: Function;
};

export const handleCalculatePrice = ({
  rows,
  setDiscountPrice,
  setFullPrice,
}: HandleCalculatePriceProps) => {
  const total = rows.reduce((sum, row) => {
    const rowTotal = convertToNumber(row["total-amount"]);
    return sum + +rowTotal;
  }, 0);
  setDiscountPrice(total);
  setFullPrice(total);
};
