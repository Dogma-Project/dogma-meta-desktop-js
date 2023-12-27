import React, { useContext, useState } from "react";
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
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import FilePresentRoundedIcon from "@mui/icons-material/FilePresentRounded";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import Chip from "@mui/material/Chip";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

function CreateUser() {
  const { isReady, send } = useContext(WebsocketContext);
  const [keyLength, setKeyLength] = useState(4096); // edit
  const [userName, setUserName] = useState(C_Defaults.userName);
  const [variant, setVariant] = useState(1);
  const [file, setFile] = useState<File | null>(null);

  const saveValue = () => {
    if (isReady) {
      send({
        type: C_API.ApiRequestType.keys,
        action:
          variant === 1
            ? C_API.ApiRequestAction.set
            : C_API.ApiRequestAction.push,
        payload:
          variant === 1
            ? {
                name: userName,
                length: keyLength,
                type: C_Keys.Type.userKey,
              }
            : file,
      });
    } else {
      console.warn("WS not ready");
    }
  };

  const onImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      console.log("FILES", files);
      setFile(files[0]);
    }
  };

  return (
    <Container className="d-flex align-items-center justify-content-center flex-row min-vh-100">
      <Card>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Create User Key
          </Typography>
          <Typography variant="body2" color="text.secondary">
            A pair of RSA private and pubic keys, which is your main identifier
            as an user of network. SHA256 Fingerprint of a public user key used
            as your User ID. When someone adds friend's user_id, he
            automatically allows all connections from nodes, associated with
            User Key. User key is just one for all your nodes (devices) and you
            should keep it as a proof of your identity. Closest analog in
            centralized networks is login+password credentials.
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              my: 2,
            }}
          >
            <ToggleButtonGroup
              color="primary"
              value={variant}
              exclusive
              onChange={(_e, value: number) => setVariant(value)}
              aria-label="Platform"
            >
              <ToggleButton value={1}>Create</ToggleButton>
              <ToggleButton value={2}>Import</ToggleButton>
            </ToggleButtonGroup>
          </Box>

          {variant === 1 ? (
            <Box>
              <TextField
                fullWidth
                id="standard-basic"
                label="Set prefix"
                variant="outlined"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                sx={{
                  my: 2,
                }}
              />

              <FormControl fullWidth>
                <InputLabel htmlFor="uncontrolled-native">
                  Set User Key length
                </InputLabel>
                <Select
                  value={keyLength}
                  onChange={(e) => setKeyLength(Number(e.target.value))}
                  variant="outlined"
                  inputProps={{
                    name: "age",
                    id: "uncontrolled-native",
                  }}
                  sx={{
                    my: 2,
                  }}
                >
                  <MenuItem value={2048}>2048 bits</MenuItem>
                  <MenuItem value={4096}>4096 bits (recommended)</MenuItem>
                </Select>
              </FormControl>
            </Box>
          ) : (
            <Box>
              {file ? (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Chip
                    icon={<FilePresentRoundedIcon />}
                    onDelete={() => setFile(null)}
                    deleteIcon={<HighlightOffRoundedIcon />}
                    label={file.name}
                  />
                </Box>
              ) : (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    my: 2,
                  }}
                >
                  <input
                    accept=".cert"
                    style={{ display: "none" }}
                    id="import-cert-button"
                    onChange={onImport}
                    multiple
                    type="file"
                  />
                  <label htmlFor="import-cert-button">
                    <Button
                      component="span"
                      size={"large"}
                      variant="outlined"
                      startIcon={<CloudUploadIcon />}
                    >
                      Upload
                    </Button>
                  </label>
                </Box>
              )}
            </Box>
          )}
        </CardContent>
        <InitScreenActions
          onConfirm={saveValue}
          confirmDisabled={variant === 1 ? userName.length < 3 : !file}
        ></InitScreenActions>
      </Card>
    </Container>
  );
}

export default CreateUser;
