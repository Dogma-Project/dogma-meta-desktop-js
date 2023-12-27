import { useContext, useState } from "react";
import {
  C_Connection,
  C_Event,
  C_Defaults,
  C_API,
} from "@dogma-project/constants-meta";

import { WebsocketContext } from "../../context";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import InitScreenActions from "./parts/init-screen-actions";
import SettingsRouter from "./settings-parts/router";
import SettingsDht from "./settings-parts/dht";
import SettingsSwitch from "./settings-parts/switch";
import SettingsExternal from "./settings-parts/external";

function CreateSettings() {
  const { isReady, send } = useContext(WebsocketContext);

  const [router, setRouter] = useState(C_Defaults.router);

  const [dhtAnnounce, setDhtAnnounce] = useState(C_Connection.Group.friends);
  const [dhtLookup, setDhtLookup] = useState(C_Connection.Group.friends);
  const [dhtBootstrap, setDhtBootstrap] = useState(C_Connection.Group.friends);

  const [localDiscovery, setLocalDiscovery] = useState(
    C_Defaults.localDiscovery
  );
  const [autoDefine, setAutoDefine] = useState(C_Defaults.autoDefineIp);
  const [external, setExternal] = useState(C_Defaults.external);

  const saveValue = () => {
    if (isReady) {
      const params: {
        [key in C_Event.Type.Config]?: string | boolean | number;
      } = {
        [C_Event.Type.configRouter]: router,
        [C_Event.Type.configDhtAnnounce]: dhtAnnounce,
        [C_Event.Type.configDhtLookup]: dhtLookup,
        [C_Event.Type.configDhtBootstrap]: dhtBootstrap,
        [C_Event.Type.configLocalDiscovery]: localDiscovery,
        [C_Event.Type.configAutoDefine]: autoDefine,
        [C_Event.Type.configExternal]: autoDefine ? external : "",
      };
      send({
        type: C_API.ApiRequestType.settings,
        action: C_API.ApiRequestAction.set,
        payload: params,
      });
    } else {
      console.warn("offline");
    }
  };

  return (
    <Container className="d-flex align-items-center justify-content-center flex-row min-vh-100">
      <Card>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Initial settings
          </Typography>

          <SettingsRouter
            router={router}
            setRouter={setRouter}
          ></SettingsRouter>

          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <SettingsDht
                value={dhtAnnounce}
                label="DHT Announce"
                setter={setDhtAnnounce}
              ></SettingsDht>
            </Grid>
            <Grid item xs={12} md={4}>
              <SettingsDht
                value={dhtLookup}
                label="DHT lookup"
                setter={setDhtLookup}
              ></SettingsDht>
            </Grid>
            <Grid item xs={12} md={4}>
              <SettingsDht
                value={dhtBootstrap}
                label="DHT bootstrap"
                setter={setDhtBootstrap}
              ></SettingsDht>
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <SettingsSwitch
                value={localDiscovery}
                label="Local discovery"
                setter={setLocalDiscovery}
              ></SettingsSwitch>
            </Grid>
            <Grid item xs={12} md={6}>
              <SettingsSwitch
                value={autoDefine}
                label="Auto define IP"
                setter={setAutoDefine}
              ></SettingsSwitch>
            </Grid>
          </Grid>

          {autoDefine && (
            <SettingsExternal
              setter={setExternal}
              value={external}
              label="External IP check services"
            ></SettingsExternal>
          )}
        </CardContent>
        <InitScreenActions
          onConfirm={saveValue}
          confirmDisabled={router < 1024 || router > 65536}
        ></InitScreenActions>
      </Card>
    </Container>
  );
}

export default CreateSettings;
