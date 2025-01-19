export const resetFactor = () => {
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
