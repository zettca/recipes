// uno.config.ts
import { defineConfig, presetUno, presetTypography } from "unocss";
import type { Theme } from "unocss/preset-uno";
import presetTheme from "unocss-preset-theme";

export default defineConfig({
  presets: [
    presetUno(),
    presetTypography(),
    presetTheme<Theme>({
      prefix: "uno-",
      theme: {
        dark: {},
      },
    }),
  ],
});
