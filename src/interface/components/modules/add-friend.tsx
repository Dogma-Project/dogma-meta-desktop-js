import Button from "@mui/material/Button";
import { useContext, useEffect, useState } from "react";
import ExportKeyModal from "./parts/export-key";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import { AppContext, ApiContext } from "../../context";
import { C_API } from "@dogma-project/core-meta/src/constants";
import TextField from "@mui/material/TextField";

export default function AddFriend() {
  const [modal, setModal] = useState(false);
  const { request } = useContext(ApiContext);
  const {
    state: { user, node },
    dispatch,
  } = useContext(AppContext);

  useEffect(() => {
    request({
      type: C_API.ApiRequestType.node,
      action: C_API.ApiRequestAction.get,
    }).then((result) => {
      dispatch({
        type: C_API.ApiRequestAction.set,
        value: { node: result.payload },
      });
    });
    request({
      type: C_API.ApiRequestType.user,
      action: C_API.ApiRequestAction.get,
    }).then((result) => {
      dispatch({
        type: C_API.ApiRequestAction.set,
        value: { user: result.payload },
      });
    });
  }, []);

  return (
    <>
      <ExportKeyModal
        open={modal}
        onclose={() => setModal(false)}
      ></ExportKeyModal>

      <Typography id="modal-modal-title" variant="h5" component="div">
        Request a friendship
      </Typography>

      <Card elevation={3} sx={{ my: 2 }}>
        <CardContent>
          <TextField
            id="own-cert"
            variant="outlined"
            label={"Your Certificate"}
            value={user?.user_id}
            multiline
            fullWidth
            onChange={() => {}}
            minRows={3}
            sx={{
              my: 1,
            }}
          />
        </CardContent>
        <CardActions sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            sx={{ my: 1 }}
            onClick={() => setModal(true)}
            variant="contained"
          >
            Copy
          </Button>
        </CardActions>
      </Card>

      <Card elevation={3} sx={{ my: 2 }}>
        <CardContent>
          <TextField
            id="own-cert"
            variant="outlined"
            label={"Friend's Certificate"}
            value={user?.user_id}
            multiline
            fullWidth
            onChange={() => {}}
            minRows={3}
            sx={{
              my: 1,
            }}
          />
        </CardContent>
        <CardActions sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            sx={{ my: 1 }}
            onClick={() => setModal(true)}
            variant="contained"
          >
            Add
          </Button>
        </CardActions>
      </Card>
    </>
  );
}
