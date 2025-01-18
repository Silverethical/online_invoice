import { TextField } from "@mui/material";

const FactorFooter = () => {
  return (
    <section className="container">
      <TextField
        placeholder="توضیحات"
        className="w-full description-input"
        multiline
        sx={{
          "::before": {
            display: "none",
          },
          "::after": {
            display: "none",
          },
        }}
      />
    </section>
  );
};

export default FactorFooter;
