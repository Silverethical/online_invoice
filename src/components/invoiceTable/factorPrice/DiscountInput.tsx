import { Box, Typography } from "@mui/material";
import { useEffect, useState, forwardRef } from "react";
import DiscountToggle from "../DiscountToggle";

type DiscountInputProps = {
  textColor: string;
  primaryColor: string;
  handlePercentageChange: React.ChangeEventHandler<HTMLInputElement>;
  setDiscountType: Function;
  discountType: string;
};

const DiscountInput = forwardRef<HTMLInputElement, DiscountInputProps>(
  (
    {
      textColor,
      primaryColor,
      handlePercentageChange,
      setDiscountType,
      discountType,
    },
    ref,
  ) => {
    const [inputPlaceholder, setInputPlaceHolder] = useState("");

    useEffect(() => {
      setInputPlaceHolder(discountType);
    }, [discountType]);

    return (
      <Box className={"py-2 px-3 flex items-center justify-between gap-1"}>
        <Box className="flex items-center gap-1">
          <Typography fontWeight={700}>تخفیف</Typography>
          <DiscountToggle
            textColor={textColor}
            primaryColor={primaryColor}
            setDiscountType={setDiscountType}
          />
        </Box>
        <input
          ref={ref}
          className="w-[20%] border-none outline-none"
          placeholder={inputPlaceholder}
          type="text"
          onChange={handlePercentageChange}
          dir="ltr"
        />
      </Box>
    );
  },
);

export default DiscountInput;
