import { useState, useContext, useEffect } from "react";
import { AppContext, WebsocketContext } from "../context";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import InitScreenActions from "./modules/parts/init-screen-actions";
import { C_API } from "@dogma-project/constants-meta";
import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import LocalStorage from "../helpers/localStorage";

function SetPrefix() {
  const { dispatch } = useContext(AppContext);
  const { manager, isReady } = useContext(WebsocketContext);

  const st = new LocalStorage("");

  const [value, setValue] = useState("");
  const [prefix, setPrefix] = useState("");
  const [prefixes, setPrefixes] = useState<string[]>([]);

  const saveValue = () => {
    const final = prefix && prefix.length ? prefix : value;
    // if value empty return
    st.set("prefix-name", final);
    manager(
      {
        type: C_API.ApiRequestType.prefix,
        action: C_API.ApiRequestAction.set,
        payload: {
          prefix: final,
        },
      },
      () => {
        dispatch({
          type: C_API.ApiRequestAction.set,
          value: {
            prefix: final,
          },
        });
      }
    );
  };

  useEffect(() => {
    manager(
      {
        type: C_API.ApiRequestType.prefixes,
        action: C_API.ApiRequestAction.get,
      },
      (res) => {
        setPrefixes(res.payload || []);
        const last = st.get("prefix-name", "default");
        if (res.payload.indexOf(last) > -1) {
          setPrefix(last);
        } else {
          setValue(last);
        }
      }
    );
  }, [isReady]);

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        width: "100vw",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Please, choose prefix to start app.
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Prefix is a namespace for your node. You can hold several profiles
            and even run them simultaneously. A new prefix is a new node.
          </Typography>

          {prefixes.length && (
            <FormControl variant="outlined" fullWidth>
              <InputLabel id="select-prefix-options">Select prefix</InputLabel>
              <Select
                onChange={(e) => setPrefix(String(e.target.value))}
                inputProps={{
                  name: "prefixes",
                  id: "select-prefix-options",
                }}
                sx={{
                  my: 3,
                }}
                value={prefix}
              >
                <MenuItem key="create_new" value={""}>
                  Create new
                </MenuItem>
                {prefixes.map((p, i) => (
                  <MenuItem key={"prefix-" + i} value={p}>
                    {p}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}

          {!prefix && (
            <TextField
              fullWidth
              id="standard-basic"
              label="Or create a new prefix"
              variant="outlined"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          )}
        </CardContent>
        <InitScreenActions
          onConfirm={saveValue}
          confirmDisabled={(prefix || value).length < 3}
        ></InitScreenActions>
      </Card>
    </Box>
  );
}

export default SetPrefix;
