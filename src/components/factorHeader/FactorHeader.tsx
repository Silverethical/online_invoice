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

const FactorHeader = ({
  textColor,
  primaryColor,
}: {
  textColor: string;
  primaryColor: string;
}) => {
  // className for header columns
  const headerColClassName = "flex flex-col gap-5 w-full md:w-[unset]";
  const headerInputClassName = "flex items-center relative";
  const inputHintClassName =
    "bg-green-700 p-2 min-w-[120px] flex justify-center rounded-s-[10px] text-white font-[600]";
  const inputClassName =
    "rounded-e-[10px] bg-gray-200 p-1 pr-2 border-none items-center md:w-[250px] text-center !hover:border-none";

  return (
    <section
      id="factor-header"
      className="container flex justify-center items-center flex-col gap-10"
    >
      <h1 className="font-[700] text-xl">فاکتور فروش رمیونا</h1>

      <form
        className="rounded-[20px] w-full gap-[15px] flex md:flex-row flex-col justify-between items-center mt-6"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="md:hidden flex items-center justify-center mb-10">
          <img src="/images/general/logo.png" className="w-[100px]" />
        </div>

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
              />
              {item.showDatePicker && (
                <DatePicker
                  calendar={persian}
                  locale={persian_fa}
                  calendarPosition="bottom-right"
                  className="absolute right-0 !w-fit"
                />
              )}
            </div>
          ))}
        </div>
        <div className="hidden md:flex items-center justify-center">
          <img src="/images/general/logo.png" className="w-[120px]" />
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
