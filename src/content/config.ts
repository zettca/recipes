import { defineCollection, z } from "astro:content";

const recipes = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string().optional().nullable().default(""),
    tags: z.string().optional().nullable(),
    author: z.string().optional().nullable(),
    /** hidden in the homepage */
    hidden: z.boolean().default(false),
    lang: z.string().default("en"),
    // Transform string to Date object
    pubDate: z.coerce.date(),
    heroImage: z.string().optional().nullable(),
  }),
});

export const collections = { recipes };
