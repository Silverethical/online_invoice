import { Input } from "@mui/material";
import FormatColorFillIcon from "@mui/icons-material/FormatColorFillRounded";
import BorderColorIcon from "@mui/icons-material/BorderColorRounded";

const ColorPicker = ({
  textColor,
  primaryColor,
  setTextColor,
  setPrimaryColor,
}: {
  textColor: string;
  primaryColor: string;
  setTextColor: React.Dispatch<React.SetStateAction<string>>;
  setPrimaryColor: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <div className="absolute left-5 top-5 flex items-center gap-2">
      <Input
        className="!hidden"
        id="primaryColor"
        name="primaryColor"
        type="color"
        onChange={(e) => {
          setPrimaryColor(e.target.value);
        }}
      />
      <label className="cursor-pointer" htmlFor="primaryColor">
        <FormatColorFillIcon style={{ color: primaryColor }} />
      </label>

      <Input
        className="!hidden"
        type="color"
        id="textColor"
        name="textColor"
        onChange={(e) => {
          setTextColor(e.target.value);
        }}
      />
      <label className="cursor-pointer" htmlFor="textColor">
        <BorderColorIcon style={{ color: textColor }} />
      </label>
    </div>
  );
};

export default ColorPicker;
