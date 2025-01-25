import { Box, Typography } from "@mui/material";
import { GridValidRowModel } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import CustomNumeralNumericFormat from "../../CustomNumericFormat";
import { convertToNumber } from "../../../helpers/convertToNumber";
import { formatWithCommas } from "../../../helpers/formatWithCommas";
import DiscountByPercentage from "./DiscountByPercentage";
import DiscountByTooman from "./DiscountByTooman";
import { handleCalculatePrice } from "./handleCalculatePrice";

type FactorPriceProps = {
  rows: readonly GridValidRowModel[];
  textColor: string;
  primaryColor: string;
};

const FactorPrice = ({ primaryColor, textColor, rows }: FactorPriceProps) => {
  const [discountPrice, setDiscountPrice] = useState<number>(0);
  const [fullPrice, setFullPrice] = useState<number>(0);
  const [toomanValue, setToomanValue] = useState<string>("");
  const [percentageValue, setPercentageValue] = useState<string>("");

  const isPercentageDisabled = toomanValue !== "";
  const isToomanValueDisabled = percentageValue !== "";

  useEffect(() => {
    handleCalculatePrice({ rows, setFullPrice, setDiscountPrice });
  }, [rows]);

  const handleToomanChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    const sanitizedValue = formatWithCommas(
      convertToNumber(rawValue).toString(),
    );

    setToomanValue(sanitizedValue);

    if (sanitizedValue === "") {
      handleCalculatePrice({ rows, setFullPrice, setDiscountPrice });
    } else {
      const discount = +convertToNumber(rawValue);
      setDiscountPrice(() => {
        const discountPrice = fullPrice - discount;
        return discountPrice >= 0 ? discountPrice : 0;
      });
    }
  };

  const handlePercentageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    const sanitizedValue = convertToNumber(rawValue).toString();

    setPercentageValue(sanitizedValue);

    if (rawValue === "") {
      handleCalculatePrice({ rows, setFullPrice, setDiscountPrice });
    } else {
      const percentage = +convertToNumber(rawValue);

      setDiscountPrice(() => {
        const discountAmount = fullPrice * (percentage / 100);
        const discountedValue = fullPrice - discountAmount;

        return discountedValue >= 0 ? discountedValue : 0;
      });
    }
  };

  return (
    <>
      <Box className="flex flex-col border border-[#ccc] rounded-[10px]">
        {/* Total Price */}
        <Box className="border-b-[1px] py-2 px-3 flex items-center justify-between">
          <Typography fontWeight={700}>جمع کل</Typography>
          <Typography>
            <CustomNumeralNumericFormat
              value={fullPrice}
              thousandSeparator=","
            />
          </Typography>
        </Box>

        {/* Discount by Tooman */}
        <DiscountByTooman
          textColor={textColor}
          primaryColor={primaryColor}
          isToomanDisabled={isToomanValueDisabled}
          toomanValue={toomanValue}
          handleToomanChange={handleToomanChange}
        />

        {/* Discount by Percentage */}
        <DiscountByPercentage
          textColor={textColor}
          primaryColor={primaryColor}
          isPercentageDisabled={isPercentageDisabled}
          percentageValue={percentageValue}
          handlePercentageChange={handlePercentageChange}
        />
      </Box>

      <Box className="pt-2 flex flex-row items-center justify-start rounded-[10px]">
        <Box
          className="w-[30%] min-w-[max-content] px-3 py-2 rounded-tr-[10px] rounded-br-[10px]"
          sx={{ backgroundColor: primaryColor, color: textColor }}
        >
          <Typography fontSize={14} fontWeight={700}>
            قابل پرداخت
          </Typography>
        </Box>
        <Box className="w-[70%] bg-[#f1f1f1] px-3 py-2 flex justify-center items-center rounded-tl-[10px] rounded-bl-[10px] flex-row gap-1">
          <CustomNumeralNumericFormat
            value={discountPrice}
            thousandSeparator=","
            className="text-[14px]"
          />
          <Typography>تومان</Typography>
        </Box>
      </Box>
    </>
  );
};

export default FactorPrice;
