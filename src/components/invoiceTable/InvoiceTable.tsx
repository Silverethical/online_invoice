import { Button, Typography } from "@mui/material";
import {
  GridRowsProp,
  DataGrid,
  GridValidRowModel,
  GridCellModesModel,
  GridCellParams,
  GridCellModes,
  GridColDef,
} from "@mui/x-data-grid";
import { useCallback, useState } from "react";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import CustomNumeralNumericFormat from "./CustomNumericFormat";

type InvoiceTableProps = {
  primaryColor: string;
  textColor: string;
  rows: readonly GridValidRowModel[];
  setRows: React.Dispatch<React.SetStateAction<readonly GridValidRowModel[]>>;
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

  const handleCellModesModelChange = useCallback(
    (newModel: GridCellModesModel) => {
      setCellModesModel(newModel);
    },
    [],
  );

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "ردیف",
      align: "center",
      headerAlign: "center",
      width: 80,
      resizable: false,
      flex: 0.5,
      cellClassName: "font-bold id-cell text-[14px]",
    },
    {
      field: "product-name",
      headerName: "نام کالا",
      align: "center",
      headerAlign: "center",
      flex: 2,
      editable: true,
      cellClassName: "text-[14px]",
    },
    {
      field: "quantity",
      headerName: "تعداد",
      align: "center",
      headerAlign: "center",
      editable: true,
      flex: 0.8,
      resizable: false,
      cellClassName: "text-[14px]",
      renderCell: (params) => (
        <div className="h-full flex items-center justify-center">
          <CustomNumeralNumericFormat
            value={params.value}
            thousandSeparator=","
          />
        </div>
      ),
    },
    {
      field: "price",
      headerName: "قیمت واحد",
      align: "center",
      headerAlign: "center",
      flex: 1.5,
      editable: true,
      renderCell: (params) => (
        <div className="h-full flex items-center justify-center">
          <CustomNumeralNumericFormat
            value={params.value}
            thousandSeparator=","
          />
        </div>
      ),
    },
    {
      field: "total-amount",
      align: "center",
      headerAlign: "center",
      flex: 2,
      renderHeader: () => (
        <div className="flex flex-row items-center justify-center gap-2">
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
      renderCell: (params) => (
        <div className="h-full flex items-center justify-center">
          <CustomNumeralNumericFormat
            value={params.value}
            thousandSeparator=","
          />
        </div>
      ),
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
          setRows(rows.filter((row) => row.id !== params.id));
        };

        return (
          <div className="h-full flex items-center justify-center">
            <DeleteOutlineIcon
              onClick={handleRowDeleteRow}
              sx={{ cursor: "pointer" }}
            />
          </div>
        );
      },
    },
  ];
  const handleAddNewRow = ({
    setRows,
  }: {
    setRows: React.Dispatch<React.SetStateAction<GridRowsProp>>;
  }) => {
    setRows([
      ...rows,
      {
        id: rows.length + 1,
        "product-name": "",
        quantity: "",
        price: "",
        "total-amount": "",
      },
    ]);
  };

  return (
    <section className="container">
      <div className="flex flex-col justify-center items-end gap-[10px]">
        <DataGrid
          density="comfortable"
          disableColumnFilter={true}
          disableColumnMenu={true}
          disableColumnSorting={true}
          disableRowSelectionOnClick={true}
          hideFooter={true}
          rows={rows}
          columns={columns}
          cellModesModel={cellModesModel}
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
            "& .id-cell": {
              borderLeft: "1px solid #ccc",
            },
            "& .MuiDataGrid-columnHeader": {
              border: "1px solid #ccc",
              backgroundColor: primaryColor,
              color: textColor,
            },
            "& .MuiDataGrid-columnSeparator": {
              opacity: 0,
            },
            "& .MuiInputBase-input": {
              textAlign: "center",
              fontSize: 14,
            },
          }}
          // onCellEditStop={(params: GridCellEditStopParams, event: MuiEvent) => {
          //   console.log("ended");
          //   console.log(event);
          // }}
        />
        <Button
          sx={{
            borderRadius: "10px",
            color: "black",
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
      </div>
    </section>
  );
};

export default InvoiceTable;
