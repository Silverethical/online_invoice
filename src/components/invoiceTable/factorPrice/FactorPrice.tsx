import { Box, Typography } from "@mui/material";
import { GridValidRowModel } from "@mui/x-data-grid";
import { useEffect, useRef, useState } from "react";
import CustomNumeralNumericFormat from "../../CustomNumericFormat";
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

  useEffect(() => {
    handleCalculatePrice({
      rows,
      setFullPrice,
      setDiscountPrice,
      discountInputRef,
      discountType,
    });
  }, [rows, discountType]);

  const handleDiscountChange = () => {
    handleCalculatePrice({
      rows,
      setFullPrice,
      setDiscountPrice,
      discountInputRef,
      discountType,
    });
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
