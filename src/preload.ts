import { contextBridge, ipcRenderer, clipboard } from "electron";
import { API } from "@dogma-project/core-meta/declarations/types";
import { RequestParams } from "./core/api";

export interface ElectronApi {
  send: (params: RequestParams) => void;
  request: (params: RequestParams) => Promise<Omit<API.Response, "id">>;
  manager: (
    params: Omit<API.Request, "id">
  ) => Promise<Omit<API.Response, "id">>;
  listen: (listener: (response: Omit<API.Response, "id">) => void) => void;
}

const system = {
  clipboard: {
    copy: (text: string) => {
      console.log("COPY", text);
      navigator.clipboard.writeText(text); // edit
      // clipboard.writeText(text, "clipboard");
    },
  },
};

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

declare global {
  interface Window {
    api: ElectronApi;
    system: typeof system;
  }
}

contextBridge.exposeInMainWorld("api", api);
contextBridge.exposeInMainWorld("system", system);
