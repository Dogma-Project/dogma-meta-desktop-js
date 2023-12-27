import TextField from "@mui/material/TextField";

type InitScreenActionsProps = {
  setRouter: (value: number) => void;
  router: number;
};

export default function SettingsRouter(props: InitScreenActionsProps) {
  return (
    <TextField
      fullWidth
      id="standard-basic"
      label="Router port "
      variant="outlined"
      type="number"
      value={props.router}
      onChange={(e) => props.setRouter(Number(e.target.value))}
      InputLabelProps={{
        shrink: true,
      }}
      sx={{
        my: 3,
      }}
    />
  );
}
