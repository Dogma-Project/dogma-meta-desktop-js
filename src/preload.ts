import { API } from "@dogma-project/core-meta/declarations/types";
import { contextBridge, ipcRenderer } from "electron";
import { RequestParams } from "./core/api";

export interface ElectronApi {
  send: (params: RequestParams) => void;
  request: (params: RequestParams) => Promise<Omit<API.Response, "id">>;
  manager: (
    params: Omit<API.Request, "id">
  ) => Promise<Omit<API.Response, "id">>;
  listen: (listener: (response: Omit<API.Response, "id">) => void) => void;
}

declare global {
  interface Window {
    api: ElectronApi;
  }
}

const api: ElectronApi = {
  send: (params) => {
    ipcRenderer.send("api", params);
  },
  request: (params) => {
    return ipcRenderer.invoke("api", params);
  },
  manager: (params) => {
    return ipcRenderer.invoke("manager", params);
  },
  listen: (listener) => {
    ipcRenderer.on("api", (event, response: Omit<API.Response, "id">) => {
      listener(response);
    });
  },
};

contextBridge.exposeInMainWorld("api", api);
