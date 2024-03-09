import { defineCollection, z } from "astro:content";

const recipes = defineCollection({
  type: "content",
  // Type-check frontmatter using a schema
  schema: z.object({
    title: z.string(),
    description: z.string().optional().default(""),
    tags: z.string().optional(),
    author: z.string().optional(),
    /** hidden in the homepage */
    hidden: z.boolean().default(false),
    lang: z.string().default("en"),
    // Transform string to Date object
    pubDate: z.coerce.date(),
    heroImage: z.string().optional(),
  }),
});

export const collections = { recipes };
