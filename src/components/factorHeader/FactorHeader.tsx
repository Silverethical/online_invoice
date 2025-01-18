import Input from "@mui/material/Input";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

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
    type: "number",
    inputMode: "numeric",
  },
  {
    name: "factor-number",
    hint: "شماره فاکتور",
    type: "number",
    inputMode: "numeric",
  },
];

const FactorHeader = () => {
  // className for header columns
  const headerColClassName = "flex flex-col gap-5";
  const headerInputClassName = "flex items-center relative";
  const inputHintClassName =
    "bg-green-700 p-2 w-[120px] flex justify-center rounded-s-[10px] text-white font-[600]";
  const inputClassName =
    "rounded-e-[10px] bg-gray-200 p-1 pr-2 border-none items-center w-[250px] text-center !hover:border-none";

  return (
    <section className="container flex justify-center items-center flex-col gap-10">
      <h1 className="font-[700] text-xl">فاکتور فروش رمیونا</h1>

      <form
        className="rounded-[20px] w-full gap-[15px] flex justify-between items-center mt-6"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className={headerColClassName}>
          {rightSideInputs.map((item, idx) => (
            <div key={idx} className={headerInputClassName}>
              <span className={inputHintClassName}>{item.hint}</span>
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
          <img src="/images/general/logo.png" className="w-[120px]" />
        </div>
        <div className={headerColClassName}>
          <div className={headerColClassName}>
            {leftSideInputs.map((item, idx) => (
              <div key={idx} className={headerInputClassName}>
                <span className={inputHintClassName}>{item.hint}</span>
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
