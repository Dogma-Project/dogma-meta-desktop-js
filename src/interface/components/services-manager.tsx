import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context";
import AppLayout from "./app-layout";
import InitLayout from "./init-layout";
import { C_API, C_Event } from "@dogma-project/constants-meta";
import { ApiContext } from "../context/api-context";

function ServicesManager() {
  const {
    state: { services },
    dispatch,
  } = useContext(AppContext);
  const { value, send } = useContext(ApiContext);

  const [stage, setStage] = useState(0);

  useEffect(() => {
    send({
      type: C_API.ApiRequestType.services,
      action: C_API.ApiRequestAction.get,
    });
  }, []);

  useEffect(() => {
    if (value) {
      switch (value.type) {
        case C_API.ApiRequestType.services:
        case C_API.ApiRequestType.network:
          dispatch({
            type: value.action as C_API.ApiRequestAction,
            value: value.payload,
          });
          break;
      }
    }
  }, [value]);

  useEffect(() => {
    const user = services.find(
      (item) => item.service === C_Event.Type.storageUser
    );
    if (!user || user.state <= 2) {
      return setStage(1);
    }
    const node = services.find(
      (item) => item.service === C_Event.Type.storageNode
    );
    if (!node || node.state <= 2) {
      return setStage(2);
    }
    const config = services.find(
      (item) => item.service === C_Event.Type.configDb
    );
    if (!config || config.state <= 2) {
      return setStage(3);
    }
    setStage(4);
  }, [services]);

  return stage === 0 ? (
    <div>Loading...</div>
  ) : stage === 4 ? (
    <AppLayout></AppLayout>
  ) : (
    <InitLayout stage={stage}></InitLayout>
  );
}

export default ServicesManager;
