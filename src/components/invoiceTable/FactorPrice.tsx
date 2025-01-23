import { Box, Typography } from "@mui/material";
import { GridValidRowModel } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import CustomNumeralNumericFormat from "./CustomNumericFormat";
import { convertToNumber } from "../../helpers/convertToNumber";
import { formatWithCommas } from "../../helpers/formatWithCommas";

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

  const handleCalculatePrice = () => {
    const total = rows.reduce((sum, row) => {
      const rowTotal = convertToNumber(row["total-amount"]);
      return sum + +rowTotal;
    }, 0);
    setDiscountPrice(total);
    setFullPrice(total);
  };

  useEffect(() => {
    handleCalculatePrice();
  }, [rows]);

  const handleToomanChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    const sanitizedValue = formatWithCommas(
      convertToNumber(rawValue).toString(),
    );

    setToomanValue(sanitizedValue);

    if (sanitizedValue === "") {
      handleCalculatePrice();
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
    const sanitizedValue = formatWithCommas(
      convertToNumber(rawValue).toString(),
    );

    setPercentageValue(sanitizedValue);

    if (sanitizedValue === "") {
      handleCalculatePrice();
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
      <Box className="w-[30%] flex flex-col border border-[#ccc] rounded-[10px]">
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
        <Box
          className={`border-b-[1px] py-2 px-3 flex items-center justify-between gap-1 ${
            isToomanValueDisabled ? "bg-gray-300" : ""
          }`}
        >
          <Box className="flex items-center gap-1">
            <Typography fontWeight={700}>تخفیف</Typography>
            <Box
              sx={{ backgroundColor: primaryColor }}
              className="p-1.5 rounded-full"
            >
              <Typography fontSize={12} fontWeight={700} color={textColor}>
                مبلغ
              </Typography>
            </Box>
          </Box>
          <input
            className="w-[20%] border-none outline-none"
            placeholder="قیمت"
            type="text"
            value={toomanValue}
            onChange={handleToomanChange}
            hidden={isToomanValueDisabled}
            disabled={isToomanValueDisabled}
            dir="ltr"
          />
        </Box>

        {/* Discount by Percentage */}
        <Box
          className={`py-2 px-3 flex items-center justify-between gap-1 ${
            isPercentageDisabled ? "bg-gray-300" : ""
          }`}
        >
          <Box className="flex items-center gap-1">
            <Typography fontWeight={700}>تخفیف</Typography>
            <Box
              sx={{ backgroundColor: primaryColor }}
              className="p-1.5 rounded-full"
            >
              <Typography fontSize={12} fontWeight={700} color={textColor}>
                درصد
              </Typography>
            </Box>
          </Box>
          <input
            className="w-[20%] border-none outline-none"
            placeholder="درصد"
            hidden={isPercentageDisabled}
            type="text"
            value={percentageValue}
            onChange={handlePercentageChange}
            disabled={isPercentageDisabled}
            dir="ltr"
          />
        </Box>
      </Box>

      <Box className="w-[30%] pt-2 flex flex-row items-center justify-start rounded-[10px]">
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
