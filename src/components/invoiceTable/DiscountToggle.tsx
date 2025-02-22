import { Box, Button } from "@mui/material";
import { useEffect, useState } from "react";

type DiscountToggleProps = {
  primaryColor: string;
  textColor: string;
  setDiscountType: Function;
};
const DiscountToggle = ({
  setDiscountType,
  primaryColor,
  textColor,
}: DiscountToggleProps) => {
  const [discountText, setDiscountText] = useState("درصد");
  const handleDiscountClick = () => {
    setDiscountText((prev) => (prev === "درصد" ? "مبلغ" : "درصد"));
  };

  useEffect(() => {
    setDiscountType(discountText);
  }, [discountText]);

  return (
    <Box
      sx={{ maxHeight: "35px", maxWidth: "45px", backgroundColor: primaryColor }}
      className="p-0 rounded-full flex items-center justify-center"
    >
      <Button
        sx={{
          color: textColor,
          fontSize: 12,
          fontWeight: 700,
        }}
        onClick={handleDiscountClick}
      >
        {discountText}
      </Button>
    </Box>
  );
};

export default DiscountToggle;
