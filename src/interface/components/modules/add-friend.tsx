import Button from "@mui/material/Button";
import { useContext, useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import { ApiContext } from "../../context";
import { C_API } from "@dogma-project/core-meta/src/constants";

import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";

export default function AddFriend() {
  const [cert, setCert] = useState("");
  const [friendCert, setFriendCert] = useState("");
  const { request } = useContext(ApiContext);
  const navigate = useNavigate();

  useEffect(() => {
    request({
      type: C_API.ApiRequestType.certificate,
      action: C_API.ApiRequestAction.get,
    }).then((result) => {
      console.log("GOT CERT", result);
      setCert(result.payload);
    });
  }, []);

  const saveCert = () => {
    request({
      type: C_API.ApiRequestType.certificate,
      action: C_API.ApiRequestAction.push,
      payload: friendCert,
    }).then((res) => {
      console.log("SET CERT RESULT", res);
      if (res && res.payload) {
        navigate("/network");
      }
    });
  };
  return (
    <>
      <Typography id="modal-modal-title" variant="h5" component="div">
        Request a friendship
      </Typography>

      <Card elevation={3} sx={{ my: 2 }}>
        <CardContent>
          <TextField
            id="own-cert"
            variant="outlined"
            label={"Your Certificate"}
            value={cert}
            disabled={true}
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
            onClick={() => {
              window.system.clipboard.copy(cert || "");
            }}
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
            multiline
            fullWidth
            onChange={(e) => setFriendCert(e.target.value)}
            minRows={3}
            sx={{
              my: 1,
            }}
          />
        </CardContent>
        <CardActions sx={{ display: "flex", justifyContent: "center" }}>
          <Button sx={{ my: 1 }} onClick={saveCert} variant="contained">
            Add
          </Button>
        </CardActions>
      </Card>
    </>
  );
}
