import TextField from "@mui/material/TextField";

type SettingsExternalProps = {
  setter: (value: string) => void;
  value: string;
  label: string;
  disabled?: boolean;
};

export default function SettingsExternal(props: SettingsExternalProps) {
  return (
    <TextField
      id="external-textarea"
      variant="outlined"
      label={props.label}
      value={props.value}
      multiline
      fullWidth
      disabled={!!props.disabled}
      minRows={3}
      sx={{
        my: 3,
      }}
      onChange={(e) => props.setter(e.target.value)}
    />
  );
}
