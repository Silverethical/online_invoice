import {
  GridRenderEditCellParams,
  GridRowId,
  useGridApiContext,
} from "@mui/x-data-grid";
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
    rows,
    setRows,
  } = props;

  const inputRef = useRef<HTMLInputElement | null>(null);
  const [formattedValue, setFormattedValue] = useState(
    formatWithCommas(valueProp?.toString() || ""),
  );
  const apiRef = useGridApiContext();
  const [discountType, setDiscountType] = useState("");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (inputRef.current && e.key === "+") {
        inputRef.current.value += "000";
        e.preventDefault();

        const event = {
          target: {
            value: inputRef.current.value,
          },
        } as React.ChangeEvent<HTMLInputElement>;

        handleValueChange(event);
      }
    };

    if (inputRef.current) {
      const timeout = setTimeout(() => {
        if (canBeFocused) {
          inputRef?.current?.select();
        }
      }, 100);

      inputRef.current.addEventListener("keydown", handleKeyDown);

      return () => {
        clearTimeout(timeout);
        inputRef.current?.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [canBeFocused]);

  const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    let changedValue: string;

    changedValue = formatWithCommas(String(convertToNumber(inputValue)));
    setFormattedValue(changedValue);

    const currentRow = rows.find((row: any) => row.id === id);
    const discountAmount = calculateDiscount(currentRow, inputValue);

    // FIXME:
    if (currentRow) {
      const discountedTotal = currentRow["total-amount"] - discountAmount;
      updateRowTotal(id, discountedTotal);
    }

    if (!apiRef.current) return;

    apiRef.current.setEditCellValue({
      id,
      field,
      value: changedValue,
      debounceMs: 200,
    });
  };

  const calculateDiscount = (row: any, inputValue: string) => {
    let discountAmount = 0;

    if (row && inputRef.current) {
      const inputNumber = convertToNumber(inputValue);
      const total = row["total-amount"];

      // FIXME:
      if (discountType === "درصد") {
        // Apply percentage discount
        discountAmount = total * (+inputNumber / 100);
      } else if (discountType === "مبلغ") {
        // Apply flat amount discount
        discountAmount = +inputNumber;
      }
    }

    return discountAmount;
  };

  const updateRowTotal = (rowId: GridRowId, newTotal: number) => {
    const rowsShallowCopy = [...rows];
    const updatedRows = rowsShallowCopy.map((row: any) => {
      if (row.id === rowId) {
        return { ...row, "total-amount": newTotal };
      }
      return row;
    });

    setRows(updatedRows);
  };

  return (
    <div
      data-discount-type={discountType}
      className="h-full w-full max-w-[190px] flex items-center justify-center gap-1 p-3"
    >
      <input
        ref={inputRef}
        className="outline-none border-none w-full text-[14px] text-center"
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
