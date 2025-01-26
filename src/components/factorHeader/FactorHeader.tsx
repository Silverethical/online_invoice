import Input from "@mui/material/Input";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { useState } from "react";

type inputDataType = {
  name: string;
  type: string;
  hint: string;
  inputMode?: "numeric";
  showDatePicker?: boolean;
}[];

const rightSideInputs: inputDataType = [
  {
    name: "customer-name",
    type: "text",
    hint: "نام مشتری",
  },
  {
    name: "date",
    hint: "تاریخ",
    type: "text",
    showDatePicker: true,
  },
];

const leftSideInputs: inputDataType = [
  {
    name: "phone-number",
    hint: "شماره تلفن",
    type: "text",
    inputMode: "numeric",
  },
  {
    name: "factor-number",
    type: "text",
    hint: "شماره فاکتور",
    inputMode: "numeric",
  },
];

const FactorHeader = ({
  textColor,
  primaryColor,
}: {
  textColor: string;
  primaryColor: string;
}) => {
  const [imageUrl, uploadImg] = useState("/images/general/logo.png");
  const [inputValues, setInputValues] = useState<Record<string, string>>({});

  // Convert Persian digits to Latin digits
  const persianToLatinDigits = (input: string) => {
    const persianDigits = "۰۱۲۳۴۵۶۷۸۹";
    const latinDigits = "0123456789";
    return input.replace(/[۰-۹]/g, (char) => {
      const index = persianDigits.indexOf(char);
      return latinDigits[index] !== undefined ? latinDigits[index] : char;
    });
  };

  // Handle input changes and validate for numeric fields
  const handleInputChange = (
    name: string,
    inputMode: string,
    value: string,
  ) => {
    let changedValue = value;

    if (inputMode === "numeric") {
      // Convert Persian digits to Latin and filter out invalid characters
      changedValue = persianToLatinDigits(value).replace(/[^0-9]/g, "");
    }

    setInputValues((prev) => ({
      ...prev,
      [name]: changedValue,
    }));
  };

  const imgFileHandler = (e: any) => {
    uploadImg(URL.createObjectURL(e.target.files[0]));
  };

  const headerColClassName = "flex flex-col gap-5";
  const headerInputClassName = "flex items-center relative";
  const inputHintClassName =
    "bg-green-700 p-2 w-[120px] flex justify-center rounded-s-[10px] text-white font-[600]";
  const inputClassName =
    "rounded-e-[10px] bg-gray-200 p-1 pr-2 border-none items-center w-[250px] text-center !hover:border-none";

  return (
    <section
      id="factor-header"
      className="container flex justify-center items-center flex-col gap-10"
    >
      <h1 className="font-[700] text-xl">فاکتور فروش رمیونا</h1>

      <form
        className="rounded-[20px] w-full gap-[15px] flex justify-between items-center mt-6"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className={headerColClassName}>
          {rightSideInputs.map((item, idx) => (
            <div key={idx} className={headerInputClassName}>
              <span
                style={{ color: textColor, backgroundColor: primaryColor }}
                className={inputHintClassName}
              >
                {item.hint}
              </span>
              <Input
                name={item.name}
                type={item.type}
                inputMode={item.inputMode ?? "text"}
                className={inputClassName}
                sx={{
                  "::before": {
                    display: "none",
                  },
                  "::after": {
                    display: "none",
                  },
                }}
                onChange={(e) =>
                  handleInputChange(
                    item.name,
                    item.inputMode ?? "",
                    e.target.value,
                  )
                }
                value={inputValues[item.name] || ""}
              />
              {item.showDatePicker && (
                <DatePicker
                  calendar={persian}
                  locale={persian_fa}
                  calendarPosition="bottom-right"
                  className="absolute right-0"
                />
              )}
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center">
          <Input
            name="logo"
            id="logo"
            onChange={imgFileHandler}
            type="file"
            className="!hidden"
          />
          <label htmlFor="logo" className="cursor-pointer">
            <img
              src={imageUrl}
              className="min-w-[120px] max-w-[120px] rounded-[50%]"
            />
          </label>
        </div>
        <div className={headerColClassName}>
          <div className={headerColClassName}>
            {leftSideInputs.map((item, idx) => (
              <div key={idx} className={headerInputClassName}>
                <span
                  style={{ color: textColor, backgroundColor: primaryColor }}
                  className={inputHintClassName}
                >
                  {item.hint}
                </span>
                <Input
                  name={item.name}
                  type={item.type}
                  inputMode={item.inputMode ?? "text"}
                  className={inputClassName}
                  inputProps={{
                    maxLength: item.name === "phone-number" ? 11 : null,
                  }}
                  sx={{
                    "::before": {
                      display: "none",
                    },
                    "::after": {
                      display: "none",
                    },
                  }}
                  onChange={(e) =>
                    handleInputChange(
                      item.name,
                      item.inputMode ?? "",
                      e.target.value,
                    )
                  }
                  value={inputValues[item.name] || ""}
                />
              </div>
            ))}
          </div>
        </div>
      </form>
    </section>
  );
};

export default FactorHeader;
