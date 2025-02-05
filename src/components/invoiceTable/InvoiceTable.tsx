import { Button, Typography } from "@mui/material";
import {
  GridRowsProp,
  DataGrid,
  GridValidRowModel,
  GridCellModesModel,
  GridCellParams,
  GridCellModes,
  GridColDef,
  GridRenderEditCellParams,
} from "@mui/x-data-grid";
import { useCallback, useState } from "react";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import CustomNumeralNumericFormat from "../CustomNumericFormat";
import { initialRows } from "../../config/initialRows";
import { convertToNumber } from "../../helpers/convertToNumber";
import { Updater } from "use-immer";
import FactorPrice from "./factorPrice/FactorPrice";
import CustomEditComponent from "./CustomEditComponent";
import reCalculateRowNumbers from "../../helpers/reCalculateRowNumbers";
import { showDeleteConfirm } from "./showDeleteConfirm";
import DiscountCell from "./DiscountCell";

type InvoiceTableProps = {
  primaryColor: string;
  textColor: string;
  rows: readonly GridValidRowModel[];
  setRows: Updater<readonly GridValidRowModel[]>;
};

const InvoiceTable = ({
  primaryColor,
  textColor,
  rows,
  setRows,
}: InvoiceTableProps) => {
  const [cellModesModel, setCellModesModel] = useState<GridCellModesModel>({});

  // enables single click edit
  const handleCellClick = useCallback(
    (params: GridCellParams, event: React.MouseEvent) => {
      if (!params.isEditable) {
        return;
      }

      // Ignore portal
      if (
        (event.target as any).nodeType === 1 &&
        !event.currentTarget.contains(event.target as Element)
      ) {
        return;
      }

      setCellModesModel((prevModel) => {
        return {
          // Revert the mode of the other cells from other rows
          ...Object.keys(prevModel).reduce(
            (acc, id) => ({
              ...acc,
              [id]: Object.keys(prevModel[id]).reduce(
                (acc2, field) => ({
                  ...acc2,
                  [field]: { mode: GridCellModes.View },
                }),
                {},
              ),
            }),
            {},
          ),
          [params.id]: {
            // Revert the mode of other cells in the same row
            ...Object.keys(prevModel[params.id] || {}).reduce(
              (acc, field) => ({
                ...acc,
                [field]: { mode: GridCellModes.View },
              }),
              {},
            ),
            [params.field]: { mode: GridCellModes.Edit },
          },
        };
      });
    },
    [],
  );

  const handleAddNewRow = ({
    setRows,
  }: {
    setRows: React.Dispatch<React.SetStateAction<GridRowsProp>>;
  }) => {
    setRows([
      ...rows,

      {
        ...initialRows[0],
        id: String(rows.length + 1),
      },
    ]);
  };

  const handleCellModesModelChange = useCallback(
    (newModel: GridCellModesModel) => {
      setCellModesModel(newModel);
    },
    [],
  );

  const handleProcessRowUpdate = (newRow: GridValidRowModel) => {
    setRows((draft) => {
      const rowToUpdate = draft.find((row) => row.id === newRow.id);
      if (rowToUpdate) {
        Object.assign(rowToUpdate, newRow);

        const baseTotal =
          +convertToNumber(rowToUpdate.quantity) *
          +convertToNumber(rowToUpdate.price);

        rowToUpdate["total-amount"] = calculateDiscount(rowToUpdate, baseTotal);
      }
    });

    return newRow;
  };

  const calculateDiscount = (row: any, totalAmount: number) => {
    let discountAmount = 0;
    const inputNumber = convertToNumber(row.discount);

    if (inputNumber === 0) return totalAmount;

    const discountType = row["discount-type"];

    if (discountType === "درصد") {
      discountAmount = totalAmount * (+inputNumber / 100);
    } else if (discountType === "مبلغ") {
      discountAmount = +inputNumber;
    }

    const finalPrice = Math.max(totalAmount - discountAmount, 0);

    return finalPrice;
  };

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "ردیف",
      align: "center",
      headerAlign: "center",
      width: 100,
      resizable: false,
      flex: 0.7,
      cellClassName: "font-bold id-cell text-[14px] select-none",
    },
    {
      field: "product-name",
      headerName: "نام کالا",
      align: "center",
      headerAlign: "center",
      flex: 2,
      editable: true,
      cellClassName: "text-[14px]",
      renderEditCell: (params: GridRenderEditCellParams) => {
        return (
          <CustomEditComponent
            isFormatabble={false}
            inputType="text"
            valueType="string"
            {...params}
          />
        );
      },
    },
    {
      field: "quantity",
      headerName: "تعداد",
      align: "center",
      headerAlign: "center",
      flex: 0.8,
      resizable: true,
      cellClassName: "text-[14px]",
      editable: true,
      renderEditCell: (params: GridRenderEditCellParams) => {
        return (
          <CustomEditComponent
            isFormatabble={false}
            valueType="number"
            inputType="number"
            {...params}
          />
        );
      },
    },
    {
      field: "price",
      headerName: "قیمت واحد",
      editable: true,
      align: "center",
      headerAlign: "center",
      flex: 1.5,
      renderCell: (params) => (
        <div className="h-full flex items-center justify-center">
          <CustomNumeralNumericFormat
            value={params.value}
            thousandSeparator=","
          />
        </div>
      ),
      renderEditCell: (params: GridRenderEditCellParams) => {
        return (
          <CustomEditComponent
            isFormatabble={true}
            valueType="string"
            inputType="text"
            {...params}
          />
        );
      },
    },
    {
      field: "discount",
      align: "center",
      headerAlign: "center",
      headerName: "تخفیف",
      flex: 2,
      editable: true,
      renderCell: (params) => {
        return (
          <DiscountCell
            {...params}
            canBeFocused={false}
            textColor={textColor}
            primaryColor={primaryColor}
            setRows={setRows}
          />
        );
      },
      renderEditCell: (params: GridRenderEditCellParams) => {
        return (
          <DiscountCell
            {...params}
            canBeFocused={true}
            textColor={textColor}
            primaryColor={primaryColor}
            setRows={setRows}
          />
        );
      },
    },
    {
      field: "total-amount",
      align: "center",
      headerAlign: "center",
      flex: 2,
      renderHeader: () => (
        <div className="flex flex-row items-center justify-center gap-1">
          <Typography>مبلغ کل</Typography>
          <Typography
            fontSize={12}
            fontWeight={900}
            className="bg-white text-black rounded-full p-1.5"
          >
            تومان
          </Typography>
        </div>
      ),
      renderCell: (params) => {
        let totalPrice =
          +convertToNumber(params.row.quantity) *
          +convertToNumber(params.row.price);

        const newTotal = calculateDiscount(params.row, totalPrice);

        totalPrice = newTotal;

        return (
          <div className="h-full flex items-center justify-center select-none">
            <CustomNumeralNumericFormat
              value={totalPrice}
              thousandSeparator=","
            />
          </div>
        );
      },
    },
    {
      field: "actions",
      align: "center",
      headerName: "عملیات",
      headerAlign: "center",
      cellClassName: "text-[14px]",
      flex: 1,
      renderCell(params) {
        const handleRowDeleteRow = () => {
          if (rows.length === 1) {
            setRows(initialRows);
            return;
          }

          setRows(rows.filter((row) => row.id !== params.id));
          reCalculateRowNumbers({ setRows });
        };

        return (
          <div className="h-full flex items-center justify-center">
            <DeleteOutlineIcon
              sx={{ cursor: "pointer" }}
              onClick={() =>
                showDeleteConfirm(handleRowDeleteRow, params.id as number)
              }
            />
          </div>
        );
      },
    },
  ];

  return (
    <section className="container !min-w-[900px]">
      <div className="flex flex-col justify-center items-end gap-[10px]">
        <DataGrid
          density="comfortable"
          disableColumnFilter={true}
          disableColumnMenu={true}
          disableColumnSorting={true}
          disableRowSelectionOnClick={true}
          cellModesModel={cellModesModel}
          hideFooter={true}
          rows={rows}
          columns={columns}
          processRowUpdate={handleProcessRowUpdate}
          onCellModesModelChange={handleCellModesModelChange}
          onCellClick={handleCellClick}
          sx={{
            width: "100%",
            borderRadius: "10px",
            border: 0,
            "& .MuiDataGrid-cell": {
              border: "1px solid #ccc",
              borderTop: "none",
              borderLeft: "none",
            },
            "& .MuiDataGrid-columnHeader": {
              border: "1px solid #ccc",
              backgroundColor: primaryColor,
              color: textColor,
            },
            "& .MuiInputBase-input": {
              textAlign: "center",
              fontSize: 14,
            },
            "& .MuiDataGrid-columnSeparator": {
              opacity: 0,
            },
          }}
        />
        <Button
          sx={{
            borderRadius: "10px",
            color: "black",
            width: "30%",
            borderColor: "#ccc",
            "&:hover": {
              backgroundColor: primaryColor,
              color: textColor || "white",
            },
          }}
          onClick={() => handleAddNewRow({ setRows })}
          variant="outlined"
        >
          اضافه کردن ردیف
        </Button>
        <div className="w-full flex justify-between">
          {/* card number details */}
          <p></p>

          <div id="factorPrice" className="flex flex-col w-[30%]">
            {/* price section */}
            <FactorPrice
              primaryColor={primaryColor}
              textColor={textColor}
              rows={rows}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default InvoiceTable;
