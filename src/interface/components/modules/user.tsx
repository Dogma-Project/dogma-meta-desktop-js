import Button from "@mui/material/Button";
import { useContext, useEffect, useState } from "react";
import ExportKeyModal from "./parts/export-key";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import { AppContext, ApiContext } from "../../context";
import { C_API } from "@dogma-project/core-meta/src/constants";
import IconButton from "@mui/material/IconButton";

import EditNoteIcon from "@mui/icons-material/EditNote";
import { User } from "@dogma-project/core-meta/declarations/types";
import { useParams } from "react-router-dom";

export default function User() {
  const [modal, setModal] = useState(false);
  const { request } = useContext(ApiContext);
  const {
    state: { user, node },
    dispatch,
  } = useContext(AppContext);
  const { user_id } = useParams();

  useEffect(() => {
    // request({
    //   type: C_API.ApiRequestType.node,
    //   action: C_API.ApiRequestAction.get,
    //   payload: {
    //     user_id
    //   },
    // }).then((result) => {
    //   dispatch({
    //     type: C_API.ApiRequestAction.set,
    //     value: { node: result.payload },
    //   });
    // });
    request({
      type: C_API.ApiRequestType.user,
      action: C_API.ApiRequestAction.get,
      payload: {
        user_id,
      },
    }).then((result) => {
      console.log("ID", result);
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
        User page
      </Typography>

      <Card elevation={3} sx={{ my: 2 }}>
        <CardContent>
          <Typography variant="h6" component="div">
            {user?.name}
          </Typography>
          <Typography variant="body2">{user?.user_id}</Typography>
        </CardContent>
        <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
          {user?.self && (
            <Button
              onClick={() => setModal(true)}
              sx={{ m: 2 }}
              variant="contained"
            >
              Export
            </Button>
          )}
          <IconButton aria-label="delete" color="primary">
            <EditNoteIcon />
          </IconButton>
        </CardActions>
      </Card>
    </>
  );
}
