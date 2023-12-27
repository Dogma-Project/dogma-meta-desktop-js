import Button from "@mui/material/Button";
import CardActions from "@mui/material/CardActions";

type InitScreenActionsProps = {
  onConfirm: () => void;
  confirmDisabled?: boolean;
};

export default function InitScreenActions(props: InitScreenActionsProps) {
  return (
    <CardActions
      sx={{
        display: "flex",
        justifyContent: "right",
        my: 2,
      }}
    >
      <Button
        onClick={props.onConfirm}
        disabled={props.confirmDisabled}
        variant="contained"
      >
        Next
      </Button>
      <Button disabled>Exit</Button>
    </CardActions>
  );
}
