// uno.config.ts
import presetIcons from "@unocss/preset-icons";
import { defineConfig, presetTypography, presetUno } from "unocss";

export default defineConfig({
  presets: [presetUno(), presetTypography(), presetIcons()],
});
