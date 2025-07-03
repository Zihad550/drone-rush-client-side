import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl, { type FormControlProps } from "@mui/material/FormControl";
import Select, { type SelectChangeEvent } from "@mui/material/Select";

interface IProps {
  name: string;
  label?: string;
  handleChange: (event: SelectChangeEvent) => void;
  defaultValue?: string | undefined;
  options: { label: string; value: string | number }[];
  sx?: FormControlProps["sx"];
}

const AppSelect = ({
  name,
  handleChange,
  defaultValue,
  label,
  options,
  sx,
}: IProps) => {
  return (
    <FormControl sx={{ minWidth: 100, width: "100%", ...sx }} size="small">
      {label && <InputLabel id={name}>{label}</InputLabel>}
      <Select
        labelId={name}
        id={name}
        name={name}
        defaultValue={defaultValue}
        onChange={handleChange}
        label={label}
        MenuProps={{ sx: { height: 400 } }}
        required
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {options.map((option) => (
          <MenuItem value={option.value}>{option.label}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default AppSelect;
