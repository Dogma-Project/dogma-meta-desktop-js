import { API } from "@dogma-project/core-meta/declarations/types";
import { instances } from "./index";
import { ipcMain } from "electron";

export type RequestParams = { prefix: string; data: Omit<API.Request, "id"> };

export default function register() {
  ipcMain.handle("api", (_event, params: RequestParams) => {
    const instance = instances[params.prefix];
    if (instance) {
      return instance.request(params.data);
    } else {
      // errCb && errCb({
      // });
    }
  });

  ipcMain.on("api", (event, params: RequestParams) => {
    if (!params) return;
    const instance = instances[params.prefix];
    if (instance) {
      instance.send(params.data);
    } else {
      // offline
    }
  });
}
