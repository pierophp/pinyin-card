import { PluginOption, defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { VitePWA, VitePWAOptions } from "vite-plugin-pwa";
import { visualizer } from "rollup-plugin-visualizer";

const analyseBundle = false;

const manifestForPlugin: Partial<VitePWAOptions> = {
  registerType: "prompt",
  includeAssets: [
    "favicon.ico",
    "/pwa/apple-icon-180.png",
    "/pwa/masked-icon.svg",
  ],
  manifest: {
    name: "Luca's Cards",
    short_name: "Luca's Cards",
    description: "An app to learn languages.",
    icons: [
      {
        src: "/pwa/manifest-icon-192.maskable.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/pwa/manifest-icon-192.maskable.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/pwa/manifest-icon-512.maskable.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/pwa/manifest-icon-512.maskable.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    theme_color: "#171717",
    background_color: "#e8ebf2",
    display: "standalone",
    scope: "/",
    start_url: "/",
    orientation: "portrait",
  },
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA(manifestForPlugin),
    ...(analyseBundle
      ? [
          visualizer({
            template: "treemap", // or sunburst
            open: true,
            gzipSize: true,
            brotliSize: true,
            filename: "analyse.html", // will be saved in project's root
          }) as any as PluginOption,
        ]
      : []),
  ],
});
