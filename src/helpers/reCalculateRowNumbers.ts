import { Updater } from "use-immer";
import { GridValidRowModel } from "@mui/x-data-grid";

type ReCalculateRowNumbers = {
  setRows: Updater<readonly GridValidRowModel[]>;
};

const reCalculateRowNumbers = ({ setRows }: ReCalculateRowNumbers) => {
  setRows((draft) => {
    draft.forEach((row, index) => {
      row.id = String(index + 1);
    });
  });
};

export default reCalculateRowNumbers;
