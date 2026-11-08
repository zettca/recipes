import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const recipes = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/recipes" }),
  schema: z.object({
    title: z.string(),
    description: z
      .string()
      .nullish()
      .transform((s) => s || ""),
    tags: z.array(z.string()).default([]),
    author: z.string().nullish(),
    /** hidden in the homepage */
    hidden: z.boolean().default(false),
    lang: z.string().default("en"),
    // Transform string to Date object
    pubDate: z.coerce.date(),
    heroImage: z.string().nullish(),
  }),
});

export const collections = { recipes };
