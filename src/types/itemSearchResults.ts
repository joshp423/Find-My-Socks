import z from "zod";

export const itemSearchResultsSchema = z.object({
  id: z.number(),
  name: z.string(),
  amount: z.number(),
  parent: z.object({
    name: z.string(),
    parent: z.object({
      name: z.string(),
    }),
  }),
});

export type ItemSearchResults = z.infer<typeof itemSearchResultsSchema>;
