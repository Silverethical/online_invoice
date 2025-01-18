import { Button, TextField } from "@mui/material";

const FactorFooter = () => {
  const handleFactorReset = () => {
    // reset all forms
    const forms = document.querySelectorAll("form");
    forms.forEach((form) => form.reset());

    // clear date picker
    const datePickerInput = document.querySelector(
      "input.rmdp-input",
    ) as HTMLInputElement;

    if (datePickerInput) datePickerInput.value = "";
  };

  return (
    <section className="container flex flex-col gap-10">
      <TextField
        placeholder="توضیحات"
        className="w-full description-input"
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

      <div className="button-wrapper flex justify-between gap-5">
        <Button
          variant="contained"
          className="w-full !bg-red-600 !rounded-[10px]"
          onClick={handleFactorReset}
        >
          ریست فاکتور
        </Button>
        <Button
          variant="contained"
          className="w-full !bg-sky-700 !rounded-[10px]"
        >
          ذخیره فاکتور
        </Button>
      </div>
    </section>
  );
};

export default FactorFooter;
