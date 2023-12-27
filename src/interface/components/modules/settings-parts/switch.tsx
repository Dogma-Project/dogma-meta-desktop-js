import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

type SettingsSwitchProps = {
  setter: (value: boolean) => void;
  value: boolean;
  label: string;
};

export default function SettingsSwitch(props: SettingsSwitchProps) {
  return (
    <FormControlLabel
      control={
        <Switch
          checked={props.value}
          onChange={(e) => props.setter(e.target.checked)}
        />
      }
      sx={{
        my: 1,
      }}
      label={props.label}
    />
  );
}
