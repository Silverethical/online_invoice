import { Box, Typography } from "@mui/material";

type DiscountByPercentageProps = {
  isPercentageDisabled: boolean;
  textColor: string;
  primaryColor: string;
  percentageValue: string;
  handlePercentageChange: React.ChangeEventHandler<HTMLInputElement>;
};

const DiscountByPercentage = ({
  isPercentageDisabled,
  textColor,
  primaryColor,
  percentageValue,
  handlePercentageChange,
}: DiscountByPercentageProps) => {
  return (
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
        type="string"
        value={percentageValue}
        onChange={handlePercentageChange}
        disabled={isPercentageDisabled}
        dir="ltr"
      />
    </Box>
  );
};

export default DiscountByPercentage;
