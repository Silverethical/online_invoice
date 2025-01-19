import { Button, TextField } from "@mui/material";
import { downloadFactor } from "./downloadFactor";
import { resetFactor } from "./resetFactor";

const FactorFooter = () => {
  return (
    <section id="factor-footer" className="container flex flex-col gap-10">
      <TextField
        placeholder="توضیحات"
        className="description-input"
        multiline
        sx={{
          "::before": {
            display: "none",
          },
          "::after": {
            display: "none",
          },
        }}
      />

      <div className="exclude button-wrapper flex justify-between gap-5">
        <Button
          variant="contained"
          className="w-full !bg-red-600 !rounded-[10px]"
          onClick={resetFactor}
        >
          ریست فاکتور
        </Button>
        <Button
          variant="contained"
          className="w-full !bg-sky-700 !rounded-[10px]"
          onClick={downloadFactor}
        >
          ذخیره فاکتور
        </Button>
      </div>
    </section>
  );
};

export default FactorFooter;
