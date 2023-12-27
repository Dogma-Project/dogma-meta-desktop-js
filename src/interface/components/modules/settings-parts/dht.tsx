import { C_Connection } from "@dogma-project/constants-meta";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

type SettingsDhtProps = {
  setter: (value: number) => void;
  value: number;
  label: string;
};

export default function SettingsDht(props: SettingsDhtProps) {
  return (
    <FormControl fullWidth>
      <InputLabel variant="standard" htmlFor="dht-switch">
        {props.label}
      </InputLabel>
      <Select
        value={props.value}
        onChange={(e) => props.setter(Number(e.target.value))}
        inputProps={{
          name: "age",
          id: "dht-switch",
        }}
        sx={{
          my: 3,
        }}
      >
        <MenuItem value={C_Connection.Group.all}>All</MenuItem>
        <MenuItem value={C_Connection.Group.friends}>Friends</MenuItem>
        <MenuItem value={C_Connection.Group.selfUser}>Self nodes</MenuItem>
        <MenuItem value={C_Connection.Group.nobody}>Nobody</MenuItem>
      </Select>
    </FormControl>
  );
}
