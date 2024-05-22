import { defineCollection, z } from "astro:content";

const recipes = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z
      .string()
      .nullish()
      .transform((s) => s || ""),
    tags: z.string().nullish(),
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
