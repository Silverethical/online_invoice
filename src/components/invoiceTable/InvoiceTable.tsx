import { Button, Typography } from "@mui/material";
import {
  GridRowsProp,
  DataGrid,
  GridColDef,
  MuiEvent,
  GridCellEditStopParams,
  GridValidRowModel,
} from "@mui/x-data-grid";
import { columns } from "./data";

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

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "ردیف",
      align: "center",
      headerAlign: "center",
      width: 80,
      resizable: false,
      flex: 0.5,
      cellClassName: "font-bold id-cell",
    },
    {
      field: "product-name",
      headerName: "نام کالا",
      align: "center",
      headerAlign: "center",
      flex: 2,
      editable: true,
    },
    {
      field: "quantity",
      headerName: "تعداد",
      align: "center",
      headerAlign: "center",
      editable: true,
      flex: 0.8,
      resizable: false,
    },
    // TODO: Add comma (render cell prop)
    {
      field: "price",
      headerName: "قیمت واحد",
      align: "center",
      headerAlign: "center",
      flex: 1.5,
      editable: true,
    },
    {
      field: "total-amount",
      align: "center",
      headerAlign: "center",
      flex: 2,
      renderHeader: () => (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 4,
          }}
        >
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
    },
  ];

  return (
    <section className="container">
      <div className="flex flex-col justify-center items-end gap-[10px]">
        <DataGrid
          density="comfortable"
          disableColumnFilter={true}
          disableColumnMenu={true}
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
          }}
          disableColumnSorting={true}
          disableRowSelectionOnClick={true}
          hideFooter={true}
          editMode="row"
          rows={rows}
          columns={columns}
          onCellEditStop={(params: GridCellEditStopParams, event: MuiEvent) => {
            console.log("ended");
            console.log(event);
          }}
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
