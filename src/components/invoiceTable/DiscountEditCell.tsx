import { GridRenderEditCellParams, useGridApiContext } from "@mui/x-data-grid";
import { useEffect, useRef, useState } from "react";
import { formatWithCommas } from "../../helpers/formatWithCommas";
import { convertToNumber } from "../../helpers/convertToNumber";
import DiscountToggle from "./DiscountToggle";

function DiscountCell(props: GridRenderEditCellParams) {
  const {
    id,
    value: valueProp,
    field,
    textColor,
    primaryColor,
    canBeFocused,
  } = props;
  const inputRef = useRef(null);
  const [formattedValue, setFormattedValue] = useState(
    formatWithCommas(valueProp?.toString() || ""),
  );
  const apiRef = useGridApiContext();
  const [discountType, setDiscountType] = useState("");

  // const triggerChangeEventForInput = () => {
  //   if (discountInputRef.current) {
  //     const input = discountInputRef.current;
  //
  //     input.value =
  //       discountType === "مبلغ" ? formatWithCommas(input.value) : input.value;
  //
  //     const syntheticEvent = {
  //       target: input,
  //     } as React.ChangeEvent<HTMLInputElement>;
  //
  //     handleDiscountChange(syntheticEvent);
  //   }
  // };

  useEffect(() => {
    // const handleKeyDown = (e: KeyboardEvent) => {
    //   if (inputType === "number" && valueType === "number" && e.key === "+") {
    //     inputRef.current.value = inputRef.current.value + "000";
    //   }
    // };

    let timeout: any;

    if (canBeFocused) {
      timeout = setTimeout(() => {
        inputRef.current.select();
      }, 10);
    }

    // inputRef.current.addEventListener("keydown", handleKeyDown);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    let changedValue: string;

    changedValue = formatWithCommas(String(convertToNumber(inputValue)));
    setFormattedValue(changedValue);

    if (!apiRef.current) return;

    apiRef.current.setEditCellValue({
      id,
      field,
      value: changedValue,
      debounceMs: 200,
    });
  };

  return (
    <div
      data-discount-type={discountType}
      className="h-full w-full max-w-[190px] flex items-center justify-center gap-1 p-3"
    >
      <input
        ref={inputRef}
        className="outline-none border-none w-full  text-[14px] text-center"
        type="text"
        value={formattedValue}
        onChange={handleValueChange}
      />
      <DiscountToggle
        textColor={textColor}
        primaryColor={primaryColor}
        setDiscountType={setDiscountType}
      />
    </div>
  );
}

export default DiscountCell;
