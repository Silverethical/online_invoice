import { Typography } from "@mui/material";
import { GridColDef, GridRowsProp } from "@mui/x-data-grid";

export const initialRows: GridRowsProp = [
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

export const columns: GridColDef[] = [
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
  },
  // TODO: Add comma (render cell prop)
  {
    field: "price",
    headerName: "قیمت واحد",
    align: "center",
    headerAlign: "center",
    flex: 1.5,
    editable: true,
    renderCell: (params) => (
      <div className="h-full flex items-center justify-center">
        <Typography fontSize={14} >{params.value}</Typography>
      </div>
    ),
  },
  {
    field: "total-amount",
    align: "center",
    headerAlign: "center",
    cellClassName: "text-[14px]",
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
