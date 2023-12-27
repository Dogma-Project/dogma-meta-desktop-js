import Button from "@mui/material/Button";
import CardActions from "@mui/material/CardActions";

type SaveCardActionProps = {
  onConfirm: () => void;
  confirmDisabled?: boolean;
};

export default function SaveCardAction(props: SaveCardActionProps) {
  return (
    <CardActions
      sx={{
        display: "flex",
        justifyContent: "right",
        mx: 3,
      }}
    >
      <Button
        onClick={props.onConfirm}
        disabled={props.confirmDisabled}
        variant="contained"
      >
        Save
      </Button>
    </CardActions>
  );
}
