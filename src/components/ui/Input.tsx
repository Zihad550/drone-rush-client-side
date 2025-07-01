import { TextField } from "@mui/material";
import { Controller } from "react-hook-form";

const Input = ({ name }: { name: string }) => {
  return (
    <div>
      <Controller
        name={name}
        render={({ field }) => <TextField {...field} name={name} id={name} />}
      />
    </div>
  );
};

export default Input;
