import { app, Menu, NativeImage, Tray } from "electron";

export default function createTray(icon: NativeImage) {
  global.tray = new Tray(icon);
  const contextMenu = Menu.buildFromTemplate([
    {
      label: "Show App",
      click: function () {
        global.win.show();
      },
    },
    {
      label: "Quit",
      click: function () {
        global.win.destroy();
        app.quit();
      },
    },
  ]);
  global.tray.setToolTip("Dogma Meta");
  global.tray.setContextMenu(contextMenu);
}
