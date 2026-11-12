import { execSync } from "node:child_process";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { defineConfig, envField } from "astro/config";
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
  image: {
    domains: ["i.imgur.com", "images.pexels.com", "res.cloudinary.com"],
  },
  env: {
    schema: {
      // Cover photo uploads in the "new recipe" form (disabled when unset)
      PUBLIC_UPLOAD_URL: envField.string({
        context: "client",
        access: "public",
        optional: true,
      }),
    },
  },
  markdown: {
    remarkPlugins: [remarkModifiedTime],
  },
});
