import { GridRenderEditCellParams, useGridApiContext } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { formatWithCommas } from "../../helpers/formatWithCommas";
import { convertToNumber } from "../../helpers/convertToNumber";

function CustomEditComponent(props: GridRenderEditCellParams) {
  const { id, value: valueProp, field } = props;
  const [formattedValue, setFormattedValue] = useState(
    formatWithCommas(valueProp?.toString() || ""),
  );
  const apiRef = useGridApiContext();

  const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = String(convertToNumber(event.target.value));

    setFormattedValue(formatWithCommas(rawValue));

    apiRef.current.setEditCellValue({
      id,
      field,
      value: rawValue,
      debounceMs: 200,
    });
  };

  useEffect(() => {
    setFormattedValue(formatWithCommas(valueProp?.toString() || ""));
  }, [valueProp]);

  return (
    <div className="h-full flex items-center justify-center">
      <input
        className="outline-none border-none w-full text-[14px] text-center"
        type="text"
        value={formattedValue}
        onChange={handleValueChange}
      />
    </div>
  );
}

export default CustomEditComponent;
