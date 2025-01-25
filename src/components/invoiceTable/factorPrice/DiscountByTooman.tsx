import { Box, Typography } from "@mui/material";

type DiscountByToomanProps = {
  isToomanDisabled: boolean;
  textColor: string;
  primaryColor: string;
  toomanValue: string;
  handleToomanChange: React.ChangeEventHandler<HTMLInputElement>;
};

const DiscountByTooman = ({
  isToomanDisabled,
  textColor,
  primaryColor,
  toomanValue,
  handleToomanChange,
}: DiscountByToomanProps) => {
  return (
    <Box
      className={`py-2 px-3 flex items-center justify-between gap-1 ${
        isToomanDisabled ? "bg-gray-300" : ""
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
        placeholder="مبلغ"
        hidden={isToomanDisabled}
        type="string"
        value={toomanValue}
        onChange={handleToomanChange}
        disabled={isToomanDisabled}
        dir="ltr"
      />
    </Box>
  );
};

export default DiscountByTooman;
