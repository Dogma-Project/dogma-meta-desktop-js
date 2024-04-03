import { app, BrowserWindow, nativeImage, Tray } from "electron";
import path from "path";
import squirrel from "electron-squirrel-startup";
import ManagerApi from "./core/manager";
import Api from "./core/api";
import createTray from "./core/tray";

declare global {
  var tray: Tray;
  var win: BrowserWindow;
}

if (squirrel) {
  app.quit();
}

const icon = nativeImage.createFromPath(
  path.resolve("./src/interface/assets/logo.png")
);

const createWindow = () => {
  // Create the browser window.
  global.win = new BrowserWindow({
    icon: icon,
    width: 1024,
    height: 768,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  global.win.on("close", function (event) {
    event.preventDefault();
    global.win.hide();
  });

  ManagerApi();
  Api();
  createTray(icon);

  // and load the index.html of the app.
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    global.win.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    global.win.loadFile(
      path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`)
    );
  }
};

app.on("ready", () => {
  createWindow();
});
