import type { ForgeConfig } from "@electron-forge/shared-types";
import { MakerSquirrel } from "@electron-forge/maker-squirrel";
import { MakerDeb } from "@electron-forge/maker-deb";
// import { MakerZIP } from "@electron-forge/maker-zip";
// import { MakerRpm } from "@electron-forge/maker-rpm";
import { VitePlugin } from "@electron-forge/plugin-vite";
import { MakerPKG } from "@electron-forge/maker-pkg";
// import { MakerFlatpak } from "@electron-forge/maker-flatpak";

const config: ForgeConfig = {
  packagerConfig: {
    executableName: "desktop-meta",
  },
  rebuildConfig: {},
  makers: [
    // new MakerRpm({}),
    // new MakerZIP({}, ["darwin"]),
    new MakerSquirrel({}),
    new MakerPKG({ name: "dogma-meta" }),
    new MakerDeb({ options: { name: "dogma-meta", bin: "desktop-meta" } }),
    // new MakerFlatpak({}),
  ],
  plugins: [
    new VitePlugin({
      // `build` can specify multiple entry builds, which can be Main process, Preload scripts, Worker process, etc.
      // If you are familiar with Vite configuration, it will look really familiar.

      build: [
        {
          // `entry` is just an alias for `build.lib.entry` in the corresponding file of `config`.
          entry: "src/main.ts",
          config: "vite.main.config.ts",
        },
        {
          entry: "src/preload.ts",
          config: "vite.preload.config.ts",
        },
      ],

      renderer: [
        {
          name: "main_window",
          config: "vite.renderer.config.ts",
        },
      ],
    }),
  ],
};

export default config;
