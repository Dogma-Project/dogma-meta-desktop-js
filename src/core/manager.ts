import fs from "node:fs/promises";
import path from "node:path";
import os from "node:os";

import { C_API, C_System } from "@dogma-project/core-meta/src/constants";
import { API } from "@dogma-project/core-meta/declarations/types";
import { RunWorker } from "@dogma-project/core-meta";
import { ipcMain } from "electron";
import { instances } from "./index";

export default function register() {
  ipcMain.handle("manager", async (event, data: Omit<API.Request, "id">) => {
    switch (data.type) {
      case C_API.ApiRequestType.prefix:
        switch (data.action) {
          case C_API.ApiRequestAction.set:
            if (data.payload && data.payload.prefix) {
              // add validation
              const { prefix } = data.payload;
              if (prefix in instances)
                return {
                  type: C_API.ApiRequestType.prefix,
                  action: C_API.ApiRequestAction.result,
                  payload: {
                    result: false,
                    id: instances[prefix].id,
                    message: "Already running",
                  },
                };
              const worker = new RunWorker({
                prefix,
                loglevel: C_System.LogLevel.debug,
              });
              worker.on("notify", (payload) => {
                global.win.webContents.send("api", payload);
              });
              worker.on("exit", () => {
                delete instances[prefix];
                console.log("Instance", prefix, "has stopped");
              });
              instances[prefix] = worker;
              return {
                type: C_API.ApiRequestType.prefix,
                action: C_API.ApiRequestAction.result,
                payload: {
                  result: true,
                  id: worker.id,
                },
              };
            }
            break;
          case C_API.ApiRequestAction.delete:
            if (data.payload && data.payload.prefix) {
              const { prefix } = data.payload;
              if (!(prefix in instances)) return console.warn("Not running");
              const instance = instances[prefix];
              await instance.stop();
              return {
                type: C_API.ApiRequestType.prefix,
                action: C_API.ApiRequestAction.result,
                payload: {
                  result: true,
                },
              };
            }
            break;
        }
        break;
      case C_API.ApiRequestType.prefixes:
        if (data.action === C_API.ApiRequestAction.get) {
          let dir = await fs.readdir(path.join(os.homedir(), "/.dogma-node"), {
            withFileTypes: true,
          });
          dir = dir.filter((i) => {
            if (!i.isDirectory()) return false;
            if (i.name.indexOf("test-") > -1) return false;
            if (i.name.indexOf("empty-") > -1) return false;
            return true;
          });
          const dirs = dir.map((i) => i.name);
          return {
            type: C_API.ApiRequestType.services, // edit !!!!
            action: C_API.ApiRequestAction.result,
            payload: dirs,
          };
        }
        break;
      default:
        // not supported
        break;
    }
  });
}
