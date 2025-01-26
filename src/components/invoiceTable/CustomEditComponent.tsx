import { GridRenderEditCellParams, useGridApiContext } from "@mui/x-data-grid";
import { useEffect, useRef, useState } from "react";
import { formatWithCommas } from "../../helpers/formatWithCommas";
import { convertToNumber } from "../../helpers/convertToNumber";

function CustomEditComponent(props: GridRenderEditCellParams) {
  const { id, value: valueProp, field, type, isFormatabble } = props;
  const inputRef = useRef(null);
  const [formattedValue, setFormattedValue] = useState(
    formatWithCommas(valueProp?.toString() || ""),
  );
  const apiRef = useGridApiContext();

  useEffect(() => {
    console.log(inputRef.current);
    const timeOut = setTimeout(() => {
      inputRef.current.select();
    }, 10);
    return () => {
      clearTimeout(timeOut);
    };
  }, []);

  const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = String(convertToNumber(event.target.value));

    if (isFormatabble) {
      setFormattedValue(formatWithCommas(rawValue));
    } else {
      setFormattedValue(rawValue);
    }

    if (apiRef.current === null) return;

    apiRef.current.setEditCellValue({
      id,
      field,
      value: rawValue,
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
        type={type || "text"}
        value={formattedValue}
        onChange={handleValueChange}
      />
    </div>
  );
}

export default CustomEditComponent;
