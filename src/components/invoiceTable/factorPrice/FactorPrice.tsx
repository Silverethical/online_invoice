import { Box, Typography } from "@mui/material";
import { GridValidRowModel } from "@mui/x-data-grid";
import { useEffect, useRef, useState } from "react";
import CustomNumeralNumericFormat from "../../CustomNumericFormat";
import { convertToNumber } from "../../../helpers/convertToNumber";
import { formatWithCommas } from "../../../helpers/formatWithCommas";
import DiscountInput from "./DiscountInput";
import { handleCalculatePrice } from "./handleCalculatePrice";

type FactorPriceProps = {
  rows: readonly GridValidRowModel[];
  textColor: string;
  primaryColor: string;
};

const FactorPrice = ({ primaryColor, textColor, rows }: FactorPriceProps) => {
  const [discountPrice, setDiscountPrice] = useState<number>(0);
  const [fullPrice, setFullPrice] = useState<number>(0);
  const [discountType, setDiscountType] = useState("");
  const discountInputRef = useRef<HTMLInputElement | null>(null);

  const [percentageValue, setPercentageValue] = useState<string>("");

  const triggerChangeEventForInput = () => {
    if (discountInputRef.current) {
      const input = discountInputRef.current;

      input.value =
        discountType === "مبلغ" ? formatWithCommas(input.value) : input.value;

      const syntheticEvent = {
        target: input,
      } as React.ChangeEvent<HTMLInputElement>;

      handleDiscountChange(syntheticEvent);
    }
  };

  useEffect(() => {
    handleCalculatePrice({ rows, setFullPrice, setDiscountPrice });
    triggerChangeEventForInput();
  }, [rows]);

  useEffect(() => {
    triggerChangeEventForInput();
  }, [discountType]);

  const handleDiscountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    let sanitizedValue: string;

    sanitizedValue = convertToNumber(rawValue).toString();
    if (discountType === "مبلغ") {
      sanitizedValue = formatWithCommas(sanitizedValue);
    }

    setPercentageValue(sanitizedValue);

    if (rawValue === "") {
      handleCalculatePrice({ rows, setFullPrice, setDiscountPrice });
    } else {
      if (discountType === "مبلغ") {
        const discount = +convertToNumber(rawValue);
        setDiscountPrice(() => {
          const discountPrice = fullPrice - discount;
          return discountPrice >= 0 ? discountPrice : 0;
        });
      } else {
        const percentage = +convertToNumber(rawValue);

        setDiscountPrice(() => {
          const discountAmount = fullPrice * (percentage / 100);
          const discountedValue = fullPrice - discountAmount;

          return discountedValue >= 0 ? discountedValue : 0;
        });
      }
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

        <DiscountInput
          textColor={textColor}
          ref={discountInputRef}
          primaryColor={primaryColor}
          percentageValue={percentageValue}
          handlePercentageChange={handleDiscountChange}
          setDiscountType={setDiscountType}
          discountType={discountType}
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
        <Box className="w-[70%] bg-[#f1f1f1] p-[6.5px] flex justify-center items-center rounded-tl-[10px] rounded-bl-[10px] flex-row gap-1">
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
