import { execSync } from "node:child_process";
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import UnoCSS from "unocss/astro";

export function remarkModifiedTime() {
  return function (tree: any, file: any) {
    const filepath = file.history[0];
    const result = execSync(`git log -1 --pretty="format:%cI" "${filepath}"`);
    file.data.astro.frontmatter.lastModified = result.toString();
  };
}

// https://astro.build/config
export default defineConfig({
  site: "https://zettca.xyz",
  base: "/recipes",
  integrations: [mdx(), sitemap(), UnoCSS({ injectReset: true })],
  markdown: {
    remarkPlugins: [remarkModifiedTime],
  },
});
