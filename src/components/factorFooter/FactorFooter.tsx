import { Button, TextField } from "@mui/material";
import html2canvas from "html2canvas";

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

    // clear textarea
    const textArea = document.querySelector(
      "#factor-footer textarea",
    ) as HTMLTextAreaElement;
    if (textArea) textArea.value = "";
  };

  const downloadFactor = () => {
    //TODO: fix this to render things correct
    const element = document.getElementById("factor")!;

    html2canvas(element, {
      ignoreElements: (el) => el.classList.contains("exclude"),
      backgroundColor: "#fff",
    }).then((canvas) => {
      const link = document.createElement("a");
      link.download = "screenshot.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    });
  };

  return (
    <section id="factor-footer" className="container flex flex-col gap-10">
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

      <div className="exclude button-wrapper flex justify-between gap-5">
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
          onClick={downloadFactor}
        >
          ذخیره فاکتور
        </Button>
      </div>
    </section>
  );
};

export default FactorFooter;
