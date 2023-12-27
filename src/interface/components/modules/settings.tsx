import { useContext, useEffect, useState } from "react";
import {
  C_Connection,
  C_Event,
  C_Defaults,
  C_API,
} from "@dogma-project/constants-meta";

import { AppContext, WebsocketContext } from "../../context";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import SettingsRouter from "./settings-parts/router";
import SettingsDht from "./settings-parts/dht";
import SettingsSwitch from "./settings-parts/switch";
import SettingsExternal from "./settings-parts/external";
import SaveCardAction from "./parts/save-card-action";
import LocalStorage from "../../helpers/localStorage";

export default function SettingsPage() {
  const { isReady, request } = useContext(WebsocketContext);
  const {
    state: { prefix },
  } = useContext(AppContext);

  const st = new LocalStorage(prefix);

  const [router, setRouter] = useState(st.get("settings-router", 0));

  const [dhtAnnounce, setDhtAnnounce] = useState(
    st.get("settings-dhtAnnounce", C_Connection.Group.nobody)
  );
  const [dhtLookup, setDhtLookup] = useState(
    st.get("settings-dhtLookup", C_Connection.Group.nobody)
  );
  const [dhtBootstrap, setDhtBootstrap] = useState(
    st.get("settings-dhtBootstrap", C_Connection.Group.nobody)
  );

  const [localDiscovery, setLocalDiscovery] = useState(
    st.get("settings-localDiscovery", true)
  );
  const [autoDefine, setAutoDefine] = useState(
    st.get("settings-autoDefine", true)
  );
  const [external, setExternal] = useState("");

  type Configs = {
    [key in C_Event.Type.Config]?: string | boolean | number;
  };

  const saveValue = () => {
    if (isReady) {
      const params: Configs = {
        [C_Event.Type.configRouter]: router,
        [C_Event.Type.configDhtAnnounce]: dhtAnnounce,
        [C_Event.Type.configDhtLookup]: dhtLookup,
        [C_Event.Type.configDhtBootstrap]: dhtBootstrap,
        [C_Event.Type.configLocalDiscovery]: localDiscovery,
        [C_Event.Type.configAutoDefine]: autoDefine,
        [C_Event.Type.configExternal]: external || C_Defaults.external,
      };
      request(
        {
          type: C_API.ApiRequestType.settings,
          action: C_API.ApiRequestAction.set,
          payload: params,
        },
        (result) => {
          console.log("SETTINGS", result);
          st.set("settings-router", router);
          st.set("settings-dhtAnnounce", dhtAnnounce);
          st.set("settings-dhtLookup", dhtLookup);
          st.set("settings-dhtBootstrap", dhtBootstrap);
          st.set("settings-localDiscovery", localDiscovery);
          st.set("settings-autoDefine", autoDefine);
        }
      );
    }
  };

  useEffect(() => {
    request(
      {
        type: C_API.ApiRequestType.settings,
        action: C_API.ApiRequestAction.get,
      },
      (result) => {
        const object = result.payload.settings as Configs;
        if (object[C_Event.Type.configRouter] !== undefined) {
          const val = Number(object[C_Event.Type.configRouter]);
          setRouter(val);
        }
        if (object[C_Event.Type.configDhtAnnounce] !== undefined) {
          const val = Number(object[C_Event.Type.configDhtAnnounce]);
          setDhtAnnounce(val);
        }
        if (object[C_Event.Type.configDhtLookup] !== undefined) {
          const val = Number(object[C_Event.Type.configDhtLookup]);
          setDhtLookup(val);
        }
        if (object[C_Event.Type.configDhtBootstrap] !== undefined) {
          const val = Number(object[C_Event.Type.configDhtBootstrap]);
          setDhtBootstrap(val);
        }
        if (object[C_Event.Type.configLocalDiscovery] !== undefined) {
          const val = !!object[C_Event.Type.configLocalDiscovery];
          setLocalDiscovery(val);
        }
        if (object[C_Event.Type.configAutoDefine] !== undefined) {
          const val = !!object[C_Event.Type.configAutoDefine];
          setAutoDefine(val);
        }
        if (object[C_Event.Type.configExternal] !== undefined) {
          const val = (object[C_Event.Type.configExternal] as string) || "";
          setExternal(val);
        }
      }
    );
  }, []);

  return (
    <>
      <Typography gutterBottom variant="h5">
        Settings
      </Typography>

      <SettingsRouter router={router} setRouter={setRouter}></SettingsRouter>

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

      <SettingsExternal
        setter={setExternal}
        value={external}
        label="External IP check services"
        disabled={!autoDefine}
      ></SettingsExternal>
      <SaveCardAction
        onConfirm={saveValue}
        confirmDisabled={router < 1024 || router > 65536}
      ></SaveCardAction>
    </>
  );
}
