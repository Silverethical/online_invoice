import FormatColorFillIcon from "@mui/icons-material/FormatColorFillRounded";
import BorderColorIcon from "@mui/icons-material/BorderColorRounded";
import { ColorPicker } from "antd";

const ColorPickers = ({
  setTextColor,
  setPrimaryColor,
}: {
  setTextColor: React.Dispatch<React.SetStateAction<string>>;
  setPrimaryColor: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <div className="exclude absolute left-5 top-5 flex items-center gap-2">
      <ColorPicker
        onChangeComplete={(color) => {
          setPrimaryColor(color.toCssString());
        }}
      >
        <FormatColorFillIcon />
      </ColorPicker>

      <ColorPicker
        onChangeComplete={(color) => {
          setTextColor(color.toCssString());
        }}
      >
        <BorderColorIcon />
      </ColorPicker>
    </div>
  );
};

export default ColorPickers;
