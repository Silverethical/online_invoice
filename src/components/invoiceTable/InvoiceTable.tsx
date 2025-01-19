import { Button, Paper } from "@mui/material";
import { GridRowsProp, DataGrid, GridColDef } from "@mui/x-data-grid";
import { useState } from "react";

type InvoiceTableProps = {
  primaryColor: string;
  textColor: string;
};

const initialRows: GridRowsProp = [
  {
    id: "1",
    "product-name": "lebas",
    quantity: "1",
    price: "1000",
    "total-amount": "1000",
  },
  {
    id: "2",
    "product-name": "لبنیات",
    quantity: "1",
    price: "1000",
    "total-amount": "1000",
  },
];

const InvoiceTable = ({ primaryColor, textColor }: InvoiceTableProps) => {
  const [rows, setRows] = useState(initialRows);

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
      width: 80,
      resizable: false,
    },
    {
      field: "product-name",
      headerName: "نام کالا",
      align: "center",
      editable: true,
    },
    {
      field: "quantity",
      headerName: "تعداد",
      align: "center",
      editable: true,
      resizable: false,
    },
    // TODO: Add comma (render cell prop)
    {
      field: "price",
      headerName: "قیمت واحد",
      align: "center",
      editable: true,
    },
    {
      field: "total-amount",
      headerName: "مبلغ کل",
      align: "center",
    },
  ];

  return (
    <section className="container">
      <div className="flex flex-col justify-center items-end gap-[10px]">
        <Paper sx={{ width: "100%" }}>
          <DataGrid
            density="comfortable"
            disableColumnFilter={true}
            disableColumnMenu={true}
            // disableColumnResize={true}
            disableColumnSorting={true}
            disableRowSelectionOnClick={true}
            hideFooter={true}
            editMode="row"
            rows={rows}
            columns={columns}
            sx={{ border: 0 }}
          />
        </Paper>
        <Button
          sx={{
            borderRadius: "10px",
            color: textColor || "black",
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
