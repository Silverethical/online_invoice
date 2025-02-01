import { GridRenderEditCellParams, useGridApiContext } from "@mui/x-data-grid";
import { useEffect, useRef, useState } from "react";
import { formatWithCommas } from "../../helpers/formatWithCommas";
import { convertToNumber } from "../../helpers/convertToNumber";

interface EditComponentProps extends GridRenderEditCellParams {
  valueType: "number" | "string";
  inputType: "number" | "text";
  isFormatabble: boolean;
}

function CustomEditComponent(props: EditComponentProps) {
  const {
    id,
    value: valueProp,
    field,
    valueType,
    inputType,
    isFormatabble,
  } = props;

  const inputRef = useRef<HTMLInputElement | null>(null);
  const [formattedValue, setFormattedValue] = useState(
    formatWithCommas(valueProp?.toString() || "")
  );
  const apiRef = useGridApiContext();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (inputRef.current && inputType === "number" && valueType === "number" && e.key === "+") {
        inputRef.current.value = inputRef.current.value + "000";
      }
    };

    if (inputRef.current) {
      const timeout = setTimeout(() => {
        inputRef.current?.select();
      }, 10);

      inputRef.current.addEventListener("keydown", handleKeyDown);

      return () => {
        clearTimeout(timeout);
        inputRef.current?.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, []);

  const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    let changedValue: string;

    const isFormatabbleInput =
      (inputType === "text" || inputType === "number") && valueType === "string";

    if (isFormatabbleInput) {
      changedValue = isFormatabble
        ? String(convertToNumber(inputValue))
        : inputValue;
    } else if (inputType === "text" && valueType === "number") {
      changedValue = inputValue;
    } else if (inputType === "number" && valueType === "number") {
      changedValue = String(convertToNumber(inputValue));
    } else {
      return;
    }

    setFormattedValue(isFormatabble ? formatWithCommas(changedValue) : changedValue);

    if (!apiRef.current) return;

    apiRef.current.setEditCellValue({
      id,
      field,
      value: changedValue,
      debounceMs: 200,
    });
  };

  useEffect(() => {
    if (isFormatabble) {
      setFormattedValue(formatWithCommas(valueProp?.toString() || ""));
    } else {
      setFormattedValue(valueProp?.toString() || "");
    }
  }, [valueProp]);

  return (
    <div className="h-full flex items-center justify-center">
      <input
        ref={inputRef}
        className="outline-none border-none w-full text-[14px] text-center"
        type={inputType || "text"}
        value={formattedValue}
        onChange={handleValueChange}
      />
    </div>
  );
}

export default CustomEditComponent;
