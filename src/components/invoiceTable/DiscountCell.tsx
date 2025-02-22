import {
  GridRenderEditCellParams,
  GridValidRowModel,
  useGridApiContext,
} from "@mui/x-data-grid";
import { useEffect, useRef, useState } from "react";
import { formatWithCommas } from "../../helpers/formatWithCommas";
import { convertToNumber } from "../../helpers/convertToNumber";
import DiscountToggle from "./DiscountToggle";
import { Updater } from "use-immer";
import { removeCommas } from "../../helpers/removeCommas";
import { Box, InputBase } from "@mui/material";

interface DiscountCellProps extends GridRenderEditCellParams {
  canBeFocused: boolean;
  setRows: Updater<readonly GridValidRowModel[]>;
}

function DiscountCell(props: DiscountCellProps) {
  const {
    id,
    value: valueProp,
    field,
    textColor,
    primaryColor,
    canBeFocused,
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

    changedValue =
      discountType === "مبلغ"
        ? formatWithCommas(String(convertToNumber(inputValue)))
        : String(convertToNumber(inputValue));
    setFormattedValue(changedValue);

    if (!apiRef.current) return;

    changedValue = removeCommas(changedValue);

    apiRef.current.setEditCellValue({
      id,
      field,
      value: changedValue,
      debounceMs: 200,
    });
  };

  useEffect(() => {
    setRows((draft) => {
      const row = draft.find((row) => row.id === id);
      if (row) {
        row["discount-type"] = discountType;
      }
    });

    // Trigger change event when discountType changes
    if (inputRef.current) {
      const event = {
        target: {
          value: inputRef.current.value,
        },
      } as React.ChangeEvent<HTMLInputElement>;

      handleValueChange(event);
    }
  }, [discountType]);

  return (
    <Box
      data-discount-type={discountType}
      className="h-full w-[180px] flex items-center justify-center gap-1 p-3"
    >
      <InputBase
        inputRef={inputRef}
        className="outline-none border-none text-[14px] text-center"
        sx={{
          width: "130px",
        }}
        type="text"
        value={formattedValue}
        onChange={handleValueChange}
      />
      <DiscountToggle
        textColor={textColor}
        primaryColor={primaryColor}
        setDiscountType={setDiscountType}
      />
    </Box>
  );
}

export default DiscountCell;
