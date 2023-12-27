import { useContext, useState } from "react";
import { C_Keys, C_Defaults, C_API } from "@dogma-project/constants-meta";

import { WebsocketContext } from "../../context";

import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import InitScreenActions from "./parts/init-screen-actions";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

function CreateNode() {
  const { isReady, send } = useContext(WebsocketContext);
  const [keyLength, setKeyLength] = useState(2048); // edit
  const [nodeName, setNodeName] = useState(C_Defaults.nodeName);

  const saveValue = () => {
    if (isReady) {
      send({
        type: C_API.ApiRequestType.keys,
        action: C_API.ApiRequestAction.set,
        payload: {
          name: nodeName,
          length: keyLength,
          type: C_Keys.Type.nodeKey,
        },
      });
    } else {
      console.warn("WS not ready");
    }
  };

  return (
    <Container className="d-flex align-items-center justify-content-center flex-row min-vh-100">
      <Card>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Create Node Key
          </Typography>
          <Typography variant="body2" color="text.secondary">
            A pair of RSA private and pubic keys, which is auto-generated on
            each of your devices as a node of network. SHA256 Fingerprint of a
            public node key used as your Node ID. If someone trusts user as a
            friend, he automatically trusts all connections from nodes,
            associated with his User Key. Node keys are different for all your
            nodes (devices) and you should not keep them or export across
            devices. It has no analogs in centralized network and you shouldn't
            handle it as a user. All that you should know - it is an identifier
            of a current device, which is associated with some user by his ID.
          </Typography>

          <TextField
            fullWidth
            id="standard-basic"
            label="Set prefix"
            variant="outlined"
            value={nodeName}
            onChange={(e) => setNodeName(e.target.value)}
            sx={{
              my: 3,
            }}
          />

          <FormControl fullWidth>
            <InputLabel variant="outlined" htmlFor="uncontrolled-native">
              Set Node Key length
            </InputLabel>
            <Select
              value={keyLength}
              onChange={(e) => setKeyLength(Number(e.target.value))}
              inputProps={{
                name: "age",
                id: "uncontrolled-native",
              }}
              sx={{
                my: 3,
              }}
            >
              <MenuItem value={1024}>1024 bits (not recommended)</MenuItem>
              <MenuItem value={2048}>2048 bits (recommended)</MenuItem>
              <MenuItem value={4096}>4096 bits (best choise)</MenuItem>
            </Select>
          </FormControl>
        </CardContent>
        <InitScreenActions
          onConfirm={saveValue}
          confirmDisabled={nodeName.length < 3}
        ></InitScreenActions>
      </Card>
    </Container>
  );
}

export default CreateNode;
