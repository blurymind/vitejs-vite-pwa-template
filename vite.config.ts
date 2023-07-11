import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import {VitePWA, VitePWAOptions} from "vite-plugin-pwa";
import ViteCompression from 'vite-plugin-compression';
// @ts-ignore
import manifest from "./public/manifest.json"

const pwaManifestPlugin:Partial<VitePWAOptions> = {
  registerType: "prompt",
  includeAssets: [
       "vite.svg",
     "logo512.png",
     "logo192.png",
    "favicon.ico"
  ], manifest
}
// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  plugins: [react(), VitePWA(pwaManifestPlugin), ViteCompression()],
})
