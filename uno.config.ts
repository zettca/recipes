// uno.config.ts
import presetIcons from "@unocss/preset-icons";
import { defineConfig, presetTypography, presetUno } from "unocss";
import presetTheme from "unocss-preset-theme";
import type { Theme } from "unocss/preset-uno";

export default defineConfig({
  presets: [
    presetUno(),
    presetTypography(),
    presetIcons(),
    presetTheme<Theme>({
      prefix: "uno-",
      theme: {
        dark: {},
      },
    }),
  ],
});
