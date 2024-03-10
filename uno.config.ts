// uno.config.ts
import { defineConfig, presetUno, presetTypography } from "unocss";
import type { Theme } from "unocss/preset-uno";
import presetIcons from "@unocss/preset-icons";
import presetTheme from "unocss-preset-theme";

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
