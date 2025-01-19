import { Input } from "@mui/material";
import FormatColorFillIcon from "@mui/icons-material/FormatColorFillRounded";
import BorderColorIcon from "@mui/icons-material/BorderColorRounded";
import _ from "lodash";

const ColorPicker = ({
  setTextColor,
  setPrimaryColor,
}: {
  setTextColor: React.Dispatch<React.SetStateAction<string>>;
  setPrimaryColor: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <div className="exclude absolute left-5 top-5 flex items-center gap-2">
      <Input
        className="!hidden"
        id="primaryColor"
        name="primaryColor"
        type="color"
        onChange={_.debounce((e) => {
          setPrimaryColor(e.target.value);
        }, 100)}
      />
      <label className="cursor-pointer" htmlFor="primaryColor">
        <FormatColorFillIcon />
      </label>

      <Input
        className="!hidden"
        type="color"
        id="textColor"
        name="textColor"
        onChange={_.debounce((e) => {
          setTextColor(e.target.value);
        }, 100)}
      />
      <label className="cursor-pointer" htmlFor="textColor">
        <BorderColorIcon />
      </label>
    </div>
  );
};

export default ColorPicker;
