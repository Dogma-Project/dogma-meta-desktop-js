import Button from "@mui/material/Button";
import { useContext, useEffect, useState } from "react";
import ExportKeyModal from "./parts/export-key";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import { AppContext, WebsocketContext } from "../../context";
import { C_API } from "@dogma-project/constants-meta";
import IconButton from "@mui/material/IconButton";

import EditNoteIcon from "@mui/icons-material/EditNote";

export default function User() {
  const [modal, setModal] = useState(false);
  const { isReady, request } = useContext(WebsocketContext);
  const {
    state: { user, node },
    dispatch,
  } = useContext(AppContext);

  useEffect(() => {
    if (isReady) {
      request(
        {
          type: C_API.ApiRequestType.node,
          action: C_API.ApiRequestAction.get,
        },
        (result) => {
          dispatch({
            type: C_API.ApiRequestAction.set,
            value: { node: result.payload },
          });
        }
      );
      request(
        {
          type: C_API.ApiRequestType.user,
          action: C_API.ApiRequestAction.get,
        },
        (result) => {
          dispatch({
            type: C_API.ApiRequestAction.set,
            value: { user: result.payload },
          });
        }
      );
    }
  }, [isReady]);

  return (
    <>
      <ExportKeyModal
        open={modal}
        onclose={() => setModal(false)}
      ></ExportKeyModal>

      <Typography id="modal-modal-title" variant="h5" component="div">
        User page
      </Typography>

      <Card elevation={3} sx={{ my: 2 }}>
        <CardContent>
          <Typography variant="h6" component="div">
            User Key
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {user?.name}
          </Typography>
          <Typography variant="body2">{user?.user_id}</Typography>
        </CardContent>
        <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            onClick={() => setModal(true)}
            sx={{ m: 2 }}
            variant="contained"
          >
            Export
          </Button>
          <IconButton aria-label="delete" color="primary">
            <EditNoteIcon />
          </IconButton>
        </CardActions>
      </Card>

      <Card elevation={3} sx={{ my: 2 }}>
        <CardContent>
          <Typography variant="h6" component="div">
            Node Key
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {node?.name}
          </Typography>
          <Typography variant="body2" noWrap={false}>
            {node?.node_id}
          </Typography>
        </CardContent>
        <CardActions sx={{ display: "flex", justifyContent: "right" }}>
          <IconButton aria-label="delete" color="primary">
            <EditNoteIcon />
          </IconButton>
        </CardActions>
      </Card>
    </>
  );
}
